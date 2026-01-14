import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const blogDir = path.join(process.cwd(),"/src/content");

export function getAllPosts(){
    console.log(blogDir)
    const files = fs.readdirSync(blogDir);
    return files.map((file)=>{
        const slug = file.replace(".md","");
        console.log(file)
        const filePath = path.join(blogDir,file)
        console.log(filePath)
        const raw = fs.readFileSync(filePath, "utf-8")
        const {data} = matter(raw);

        return {
            slug,
            title:data.title,
            date: data.date,
            description: data.description,
            tags: data.tags || [],
        };
    });
}

export async function getPostBySlug(slug) {

    const filePath = path.join(blogDir, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf-8");

    const { data, content } = matter(raw);
    const processed = await remark().use(remarkRehype).use(rehypeStringify).process(content);

    return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        content: processed.toString(),
    };
}