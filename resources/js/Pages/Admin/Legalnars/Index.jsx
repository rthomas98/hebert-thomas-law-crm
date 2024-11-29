import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SearchFilter from '@/Components/Admin/SearchFilter';
import DateRangeFilter from '@/Components/Admin/DateRangeFilter';
import StatusFilter from '@/Components/Admin/StatusFilter';
import BulkActions from '@/Components/Admin/BulkActions';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import useFlashMessages from '@/Hooks/useFlashMessages';

const LEGALNAR_CATEGORIES = [
    'Business Law',
    'Criminal Law',
    'Family Law',
    'Estate Planning',
    'Personal Injury',
    'Real Estate',
    'Other'
];

export default function Index({ auth, legalnars }) {
    useFlashMessages();
    const [selectedItems, setSelectedItems] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        startDate: '',
        endDate: '',
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Legalnars
                </h2>
            }
        >
            <Head title="Legalnars" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Filters */}
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <SearchFilter
                                    value={filters.search}
                                    onChange={(value) => setFilters({ ...filters, search: value })}
                                    placeholder="Search legalnars..."
                                />
                                <StatusFilter
                                    value={filters.status}
                                    onChange={(value) => setFilters({ ...filters, status: value })}
                                />
                                <DateRangeFilter
                                    startDate={filters.startDate}
                                    endDate={filters.endDate}
                                    onStartDateChange={(value) => setFilters({ ...filters, startDate: value })}
                                    onEndDateChange={(value) => setFilters({ ...filters, endDate: value })}
                                />
                            </div>

                            {/* Actions */}
                            <div className="mb-6 flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href={route('admin.legalnars.create')}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Create Legalnar
                                    </Link>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                    checked={selectedItems.length === legalnars.data.length}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedItems(legalnars.data.map(item => item.id));
                                                        } else {
                                                            setSelectedItems([]);
                                                        }
                                                    }}
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Series
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {legalnars.data.map((legalnar) => (
                                            <tr key={legalnar.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                        checked={selectedItems.includes(legalnar.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedItems([...selectedItems, legalnar.id]);
                                                            } else {
                                                                setSelectedItems(selectedItems.filter(id => id !== legalnar.id));
                                                            }
                                                        }}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {legalnar.title}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {legalnar.series?.title || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        legalnar.is_published
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {legalnar.is_published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {legalnar.category || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        ${legalnar.price || '0.00'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={route('admin.legalnars.show', legalnar.id)}
                                                            className="text-gray-400 hover:text-gray-500"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.legalnars.edit', legalnar.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(legalnar.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Bulk Actions */}
                            <BulkActions
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                                type="legalnars"
                                categories={LEGALNAR_CATEGORIES}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
