import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';

export default function Index({ auth, legalnars }) {
    const formatDate = (isoString) => {
        if (!isoString) return 'Not scheduled';
        try {
            const date = new Date(isoString);
            if (isNaN(date.getTime())) return 'Invalid date';
            return format(date, 'MMM d, yyyy h:mm a');
        } catch (error) {
            console.error('Error formatting date:', error, isoString);
            return 'Error formatting date';
        }
    };

    console.log('Legalnars data:', legalnars.data);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Legalnars
                    </h2>
                    <Link
                        href={route('admin.legalnars.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create Legalnar
                    </Link>
                </div>
            }
        >
            <Head title="Legalnars" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Series
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Scheduled For
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {legalnars.data.map((legalnar) => (
                                            <tr 
                                                key={legalnar.id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                                onClick={() => router.visit(route('admin.legalnars.edit', legalnar.id))}
                                            >
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {legalnar.title}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {legalnar.series?.title || 'No Series'}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm text-gray-900">
                                                        {formatDate(legalnar.scheduled_at)}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                    <div className="flex space-x-3" onClick={(e) => e.stopPropagation()}>
                                                        <Link
                                                            href={route('admin.legalnars.edit', legalnar.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this legalnar?')) {
                                                                    router.delete(route('admin.legalnars.destroy', legalnar.id));
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
