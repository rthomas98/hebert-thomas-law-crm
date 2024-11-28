import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function LegalServicesOverview() {
    return (
        <GuestLayout>
            <Head title="Other Legal Services Overview" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Other Legal Services</h1>
                </div>
            </div>
        </GuestLayout>
    );
}
