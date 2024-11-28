import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            
            <main className="flex-grow">
                <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
                    <div>
                        <Link href="/">
                            <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                        </Link>
                    </div>

                    <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
