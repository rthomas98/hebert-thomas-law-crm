import { Link } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About Me', href: '/about' },
        {
            name: 'Trademark Services',
            href: '/trademark',
            submenu: [
                { name: 'Overview', href: '/trademark' },
                { name: 'Clearance Search', href: '/trademark/clearance-search' },
                { name: 'Registration', href: '/trademark/registration' },
                { name: 'Monitoring', href: '/trademark/monitoring' },
                { name: 'Enforcement & Litigation', href: '/trademark/enforcement' },
                { name: 'Renewal', href: '/trademark/renewal' },
                { name: 'Licensing Agreements', href: '/trademark/licensing' },
                { name: 'International Registration', href: '/trademark/international' },
                { name: 'Opposition & Cancellation', href: '/trademark/opposition' },
            ],
        },
        {
            name: 'Other Legal Services',
            href: '/legal-services',
            submenu: [
                { name: 'Overview', href: '/legal-services' },
                { name: 'Business Law', href: '/legal-services/business' },
                { name: 'Estate Planning', href: '/legal-services/estate-planning' },
                { name: 'General Counsel', href: '/legal-services/general-counsel' },
                { name: 'Privacy & Data Protection', href: '/legal-services/privacy' },
            ],
        },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="bg-white shadow">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="h-8 w-auto" />
                            </Link>
                        </div>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="flex space-x-4">
                            {navigation.map((item) => (
                                <div key={item.name} className="relative group">
                                    <Link
                                        href={item.href}
                                        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                    >
                                        {item.name}
                                    </Link>
                                    
                                    {item.submenu && (
                                        <div className="absolute left-0 mt-2 w-48 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                            <div className="py-1">
                                                {item.submenu.map((subItem) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <div key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                    {item.submenu && (
                                        <div className="pl-4">
                                            {item.submenu.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    href={subItem.href}
                                                    className="block px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
