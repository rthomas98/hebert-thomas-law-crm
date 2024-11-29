import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from './Form';

export default function Edit({ auth, caseResult }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Case Result</h2>}
        >
            <Head title="Edit Case Result" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Form caseResult={caseResult} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
