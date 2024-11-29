import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import BulkActions from '@/Components/Admin/BulkActions';
import SearchFilter from '@/Components/Admin/SearchFilter';
import StatusFilter from '@/Components/Admin/StatusFilter';

export default function Index({ auth, series }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleBulkAction = async (action, data) => {
        // Handle bulk actions here
    };

    const filteredSeries = series.data.filter(item => {
        const matchesSearch = searchQuery === '' || 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.level.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || 
            (item.is_published ? 'published' : 'draft') === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Legalnar Series
                    </h2>
                    <Link
                        href="/admin/legalnar-series/create"
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create Series
                    </Link>
                </div>
            }
        >
            <Head title="Legalnar Series" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 space-y-4">
                                <div className="flex flex-wrap gap-4">
                                    <SearchFilter
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                        placeholder="Search series..."
                                    />
                                    <StatusFilter
                                        value={statusFilter}
                                        onChange={setStatusFilter}
                                        options={[
                                            { value: 'all', label: 'All Status' },
                                            { value: 'published', label: 'Published' },
                                            { value: 'draft', label: 'Draft' }
                                        ]}
                                    />
                                </div>
                                {selectedItems.length > 0 && (
                                    <BulkActions
                                        selectedCount={selectedItems.length}
                                        onAction={handleBulkAction}
                                        actions={[
                                            { value: 'delete', label: 'Delete Selected' },
                                            { value: 'publish', label: 'Publish Selected' },
                                            { value: 'unpublish', label: 'Unpublish Selected' }
                                        ]}
                                    />
                                )}
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="w-4 p-4">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    checked={selectedItems.length === filteredSeries.length}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedItems(filteredSeries.map(item => item.id));
                                                        } else {
                                                            setSelectedItems([]);
                                                        }
                                                    }}
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Level
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Total Sessions
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {filteredSeries.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="w-4 p-4">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        checked={selectedItems.includes(item.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedItems([...selectedItems, item.id]);
                                                            } else {
                                                                setSelectedItems(selectedItems.filter(id => id !== item.id));
                                                            }
                                                        }}
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm text-gray-500">{item.level}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm text-gray-500">{item.legalnars?.length || 0}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                        item.is_published
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {item.is_published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <Link
                                                        href={`/admin/legalnar-series/${item.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="mt-4">
                                {series.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`mx-1 rounded px-3 py-1 ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
