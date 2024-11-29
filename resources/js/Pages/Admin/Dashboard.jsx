import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <a
                                    href={route('admin.legalnars.index')}
                                    className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <h4 className="font-medium text-gray-900">Manage Legalnars</h4>
                                    <p className="text-gray-600 mt-2">Create, edit, and manage your legal articles</p>
                                </a>
                                <a
                                    href={route('admin.legalnar-series.index')}
                                    className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <h4 className="font-medium text-gray-900">Manage Series</h4>
                                    <p className="text-gray-600 mt-2">Organize your articles into series</p>
                                </a>
                                <a
                                    href={route('admin.case-results.index')}
                                    className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <h4 className="font-medium text-gray-900">Case Results</h4>
                                    <p className="text-gray-600 mt-2">Showcase your successful case outcomes</p>
                                </a>
                                <a
                                    href={route('admin.insights.index')}
                                    className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <h4 className="font-medium text-gray-900">Insights</h4>
                                    <p className="text-gray-600 mt-2">Share legal insights and industry knowledge</p>
                                </a>
                                <a
                                    href={route('admin.client-resources.index')}
                                    className="block p-6 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <h4 className="font-medium text-gray-900">Client Resources</h4>
                                    <p className="text-gray-600 mt-2">Manage downloadable resources for clients</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
