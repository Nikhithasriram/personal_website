import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import Link from "next/link";
export default function Blog() {
    const posts = getAllPosts();
    return (
        <main className="">
            <h1 className="text-3xl pt-30">
                Blog
            </h1>
            {posts.map((post) => (
                
                <article key={post.slug} className="mt-5 px-5  pl-6 border-l-3 border-accent">
                    <Link href={`/blog/${post.slug}`}>
                        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">

                    <p className="text-xl blog-heading">{post.title}</p>
                    <p className="mr-10">{formatDate(post.date)}</p>
                    </div>

                        <p className="flex-1 px-4">
                            {post.description}....
                            <span  className="ml-4 text-muted hover:underline whitespace-nowrap">
                                read more
                            </span>
                        </p>
                    </Link>
                </article>
            ))}
        </main>
    );
}
