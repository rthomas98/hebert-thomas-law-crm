import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-white text-sm font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="tel:+1234567890" className="text-gray-300 hover:text-white text-sm">
                                        (123) 456-7890
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:contact@hebert-thomas-law.com" className="text-gray-300 hover:text-white text-sm">
                                        contact@hebert-thomas-law.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white text-sm font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="text-gray-300 hover:text-white text-sm">
                                        About Me
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-gray-300 hover:text-white text-sm">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-white text-sm font-semibold mb-4">Services</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/trademark" className="text-gray-300 hover:text-white text-sm">
                                        Trademark Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal-services" className="text-gray-300 hover:text-white text-sm">
                                        Legal Services
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="text-white text-sm font-semibold mb-4">Connect</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-300 hover:text-white">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 py-8">
                    <p className="text-center text-sm text-gray-400">
                        © {currentYear} Hebert-Thomas Law. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
