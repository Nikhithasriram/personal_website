import Image from "next/image";

export default function Hero() {
    return (
        <main >
            <nav className="flex gap-6 sm:gap-10 ">
                <a href="https://github.com/Nikhithasriram " className=" text-xl sm:text-xl md:text-2xl nav-element">GitHub</a>
                <a href="https://www.linkedin.com/in/nikhitha-sriram-068108270/" className="text-xl sm:text-xl md:text-2xl nav-element">LinkedIn</a>
            </nav>

            <h1 className="pt-35 sm:pt-30 text-4xl sm:text-4xl md:text-6xl leading-tight p-2">
                Hi! I’m Nikhitha Sriram
            </h1>
            <p className="p-2">
                I build software projects and occasionally write about them.
            </p>
        </main>
    );
}
