import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import Link from "next/link";
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post)=>{
       return { slug: post.slug}
    });
}

export default async function BlogPage({ params }) {
    const {slug} = await params;
    const post = await getPostBySlug(slug);

    return (
        <main className=" ">
            <nav className="nav-element px-4 pt-6 sm:pt-10 sm:px-8 md:px-30 flex gap-6 sm:gap-10">

                <Link href="/" className="text-base sm:text-lg md:text-xl nav-element">Home</Link>
                <a href="https://github.com/Nikhithasriram" className="text-base sm:text-lg md:text-xl nav-element">GitHub</a>
                <a href="https://www.linkedin.com/in/nikhitha-sriram-068108270/" className="text-base sm:text-lg md:text-xl nav-element">LinkedIn</a>
            </nav>
            <div className="mt-10 article-content">
                <div className="flex flex-col sm:flex-row sm:items-baseline">
                    <h1>{post.title}</h1>
                    <p className="sm:ml-auto date">{formatDate(post.date)}</p>
                </div>

            <div
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            </div>
        </main>
    );
}