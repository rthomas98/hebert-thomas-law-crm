import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function EstatePlanning() {
    return (
        <GuestLayout>
            <Head title="Estate Planning Services" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Estate Planning Services</h1>
                </div>
            </div>
        </GuestLayout>
    );
}
