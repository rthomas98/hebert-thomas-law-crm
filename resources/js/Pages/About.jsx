import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <GuestLayout>
            <Head title="About Me" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">About Me</h1>
                </div>
            </div>
        </GuestLayout>
    );
}
