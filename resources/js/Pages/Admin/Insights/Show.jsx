import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';

export default function Show({ auth, insight }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMMM d, yyyy');
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Insight Details</h2>}
        >
            <Head title={`Insight - ${insight.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-gray-900">{insight.title}</h3>
                                <div className="space-x-4">
                                    <Link
                                        href={route('admin.insights.edit', insight.id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Edit Insight
                                    </Link>
                                    <Link
                                        href={route('admin.insights.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Back to List
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Basic Information</h4>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <p className="mt-1 text-sm text-gray-900">{insight.category}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Author</label>
                                                <p className="mt-1 text-sm text-gray-900">{insight.author?.name || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Publication Date</label>
                                                <p className="mt-1 text-sm text-gray-900">{formatDate(insight.published_at)}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    insight.is_published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {insight.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Featured</label>
                                                <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    insight.is_featured
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {insight.is_featured ? 'Featured' : 'Not Featured'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {insight.tags && insight.tags.length > 0 && (
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">Tags</h4>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {insight.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Content</h4>
                                        <div className="mt-4 space-y-4">
                                            {insight.summary && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Summary</label>
                                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{insight.summary}</p>
                                                </div>
                                            )}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                                <div className="mt-1 prose max-w-none">
                                                    <div dangerouslySetInnerHTML={{ __html: insight.content }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {insight.featured_image && (
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">Featured Image</h4>
                                            <div className="mt-2">
                                                <img
                                                    src={insight.featured_image}
                                                    alt={insight.title}
                                                    className="max-w-full h-auto rounded-lg shadow-lg"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
