import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';

export default function Show({ auth, legalnar }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMMM d, yyyy h:mm a');
    };

    const formatDuration = (minutes) => {
        if (!minutes) return 'Not specified';
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours === 0) return `${remainingMinutes} minutes`;
        return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined) return 'Not specified';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Legalnar Details</h2>}
        >
            <Head title={`Legalnar - ${legalnar.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-gray-900">{legalnar.title}</h3>
                                <div className="space-x-4">
                                    <Link
                                        href={route('admin.legalnars.edit', legalnar.id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Edit Legalnar
                                    </Link>
                                    <Link
                                        href={route('admin.legalnars.index')}
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
                                            {legalnar.series && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Series</label>
                                                    <Link 
                                                        href={route('admin.legalnar-series.show', legalnar.series.id)}
                                                        className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        {legalnar.series.title}
                                                    </Link>
                                                    <p className="mt-1 text-sm text-gray-500">Session {legalnar.session_number}</p>
                                                </div>
                                            )}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                                <p className="mt-1 text-sm text-gray-900">{legalnar.category}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Level</label>
                                                <p className="mt-1 text-sm text-gray-900 capitalize">{legalnar.level}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Duration</label>
                                                <p className="mt-1 text-sm text-gray-900">{formatDuration(legalnar.duration_minutes)}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                                <p className="mt-1 text-sm text-gray-900">{formatPrice(legalnar.price)}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                                                <p className="mt-1 text-sm text-gray-900">{legalnar.instructor?.name || 'Not assigned'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Scheduled Time</label>
                                                <p className="mt-1 text-sm text-gray-900">{formatDate(legalnar.scheduled_at)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Status</h4>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex space-x-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    legalnar.is_published
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {legalnar.is_published ? 'Published' : 'Draft'}
                                                </span>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    legalnar.is_featured
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {legalnar.is_featured ? 'Featured' : 'Not Featured'}
                                                </span>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    legalnar.is_live
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {legalnar.is_live ? 'Live Session' : 'Recorded'}
                                                </span>
                                            </div>
                                            {legalnar.published_at && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Published Date</label>
                                                    <p className="mt-1 text-sm text-gray-900">{formatDate(legalnar.published_at)}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Content</h4>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{legalnar.description}</p>
                                            </div>
                                            {legalnar.what_you_will_learn && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">What You Will Learn</label>
                                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{legalnar.what_you_will_learn}</p>
                                                </div>
                                            )}
                                            {legalnar.topics && legalnar.topics.length > 0 && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Topics</label>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        {legalnar.topics.map((topic, index) => (
                                                            <span
                                                                key={index}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Media & Resources</h4>
                                        <div className="mt-4 space-y-4">
                                            {legalnar.thumbnail_path && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                                                    <img
                                                        src={legalnar.thumbnail_path}
                                                        alt="Thumbnail"
                                                        className="mt-2 max-w-xs h-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            )}
                                            {legalnar.featured_image && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Featured Image</label>
                                                    <img
                                                        src={legalnar.featured_image}
                                                        alt="Featured"
                                                        className="mt-2 max-w-xs h-auto rounded-lg shadow-sm"
                                                    />
                                                </div>
                                            )}
                                            {legalnar.video_url && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Video URL</label>
                                                    <a 
                                                        href={legalnar.video_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-1 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        View Video
                                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            )}
                                            {legalnar.meeting_url && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Meeting URL</label>
                                                    <a 
                                                        href={legalnar.meeting_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-1 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        Join Meeting
                                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            )}
                                            {legalnar.resources && legalnar.resources.length > 0 && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Additional Resources</label>
                                                    <ul className="mt-2 space-y-2">
                                                        {legalnar.resources.map((resource, index) => (
                                                            <li key={index}>
                                                                <a 
                                                                    href={resource.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-sm text-blue-600 hover:text-blue-800"
                                                                >
                                                                    {resource.title || 'Resource ' + (index + 1)}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
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
