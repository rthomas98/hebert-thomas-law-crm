import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';
import { useState } from 'react';
import BulkActions from '@/Components/Admin/BulkActions';
import SearchFilter from '@/Components/Admin/SearchFilter';
import StatusFilter from '@/Components/Admin/StatusFilter';

export default function Index({ auth, resources }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleBulkAction = async (action, data) => {
        // Handle bulk actions here
    };

    const filteredResources = resources.data.filter(resource => {
        const matchesSearch = searchQuery === '' || 
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || 
            (resource.is_published ? 'published' : 'draft') === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Client Resources</h2>}
        >
            <Head title="Client Resources" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">All Client Resources</h3>
                        <Link
                            href={route('admin.client-resources.create')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add New Resource
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 space-y-4">
                                <div className="flex flex-wrap gap-4">
                                    <SearchFilter
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                        placeholder="Search resources..."
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
                                    <thead>
                                        <tr>
                                            <th className="w-4 p-4">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    checked={selectedItems.length === filteredResources.length}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedItems(filteredResources.map(item => item.id));
                                                        } else {
                                                            setSelectedItems([]);
                                                        }
                                                    }}
                                                />
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Access Level
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredResources.map((resource) => (
                                            <tr key={resource.id} className="hover:bg-gray-50">
                                                <td className="w-4 p-4">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        checked={selectedItems.includes(resource.id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedItems([...selectedItems, resource.id]);
                                                            } else {
                                                                setSelectedItems(selectedItems.filter(id => id !== resource.id));
                                                            }
                                                        }}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {resource.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {resource.type}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {resource.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {resource.access_level}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        resource.is_published 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {resource.is_published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route('admin.client-resources.edit', resource.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('admin.client-resources.destroy', resource.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Delete
                                                    </Link>
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
