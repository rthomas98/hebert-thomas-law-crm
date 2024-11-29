import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';

export default function Show({ auth, resource }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMMM d, yyyy');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Client Resource Details</h2>}
        >
            <Head title={`Client Resource - ${resource.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-gray-900">{resource.title}</h3>
                                <div className="space-x-4">
                                    <Link
                                        href={route('admin.client-resources.edit', resource.id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Edit Resource
                                    </Link>
                                    <Link
                                        href={route('admin.client-resources.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Back to List
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Resource Information</h4>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                                <p className="mt-1 text-sm text-gray-900">{resource.type}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <p className="mt-1 text-sm text-gray-900">{resource.category}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Access Level</label>
                                                <p className="mt-1 text-sm text-gray-900">{resource.access_level}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    resource.is_published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {resource.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Featured</label>
                                                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    resource.is_featured
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {resource.is_featured ? 'Featured' : 'Not Featured'}
                                                </span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                                <p className="mt-1 text-sm text-gray-900">{formatDate(resource.updated_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Resource Details</h4>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{resource.description}</p>
                                            </div>
                                            {resource.file_path && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">File</label>
                                                    <a 
                                                        href={resource.file_path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        View File
                                                    </a>
                                                </div>
                                            )}
                                            {resource.download_url && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">External Link</label>
                                                    <a 
                                                        href={resource.download_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        Visit Link
                                                    </a>
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
