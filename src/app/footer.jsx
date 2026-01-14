export default function Footer() {
    return (
        <footer className="mt-32 px-4 sm:px-8 md:px-30 py-8 border-t border-white/10">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between text-sm opacity-70">
                <p>© {new Date().getFullYear()} Nikhitha Sriram</p>

                <div className="flex gap-4">
                    <a
                        href="https://github.com/Nikhithasriram"
                        className="hover:underline"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/nikhitha-sriram-068108270/"
                        className="hover:underline"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
