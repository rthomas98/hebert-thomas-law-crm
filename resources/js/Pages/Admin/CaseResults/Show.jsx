import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';

export default function Show({ auth, caseResult }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMMM d, yyyy');
    };

    const formatAmount = (amount) => {
        if (amount === null || amount === undefined) return 'Not specified';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Case Result Details</h2>}
        >
            <Head title={`Case Result - ${caseResult.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-gray-900">{caseResult.title}</h3>
                                <div className="space-x-4">
                                    <Link
                                        href={route('admin.case-results.edit', caseResult.id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Edit Case Result
                                    </Link>
                                    <Link
                                        href={route('admin.case-results.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Back to List
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Case Information</h4>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Case Type</label>
                                                <p className="mt-1 text-sm text-gray-900">{caseResult.case_type}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                                <p className="mt-1 text-sm text-gray-900">{formatAmount(caseResult.amount)}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Date Resolved</label>
                                                <p className="mt-1 text-sm text-gray-900">{formatDate(caseResult.date_resolved)}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Outcome</label>
                                                <p className="mt-1 text-sm text-gray-900">{caseResult.outcome}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    caseResult.is_published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {caseResult.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Case Details</h4>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{caseResult.description}</p>
                                            </div>
                                            {caseResult.client_testimonial && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Client Testimonial</label>
                                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{caseResult.client_testimonial}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
