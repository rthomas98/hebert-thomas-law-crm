import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';
import BulkActions from '@/Components/Admin/BulkActions';
import SearchFilter from '@/Components/Admin/SearchFilter';
import DateRangeFilter from '@/Components/Admin/DateRangeFilter';
import StatusFilter from '@/Components/Admin/StatusFilter';
import { useState } from 'react';

export default function Index({ auth, caseResults }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [statusFilter, setStatusFilter] = useState('all');

    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? 'Invalid date' : format(date, 'MMM d, yyyy');
    };

    const formatAmount = (amount) => {
        if (amount === null || amount === undefined) return 'Not specified';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const handleBulkAction = async (action, data) => {
        // Handle bulk actions here
    };

    const filteredResults = caseResults.data.filter(result => {
        const matchesSearch = searchQuery === '' || 
            result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.case_type.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || (result.is_published ? 'published' : 'draft') === statusFilter;
        
        const matchesDate = !dateRange.start || !dateRange.end || 
            (new Date(result.date_resolved) >= new Date(dateRange.start) && 
             new Date(result.date_resolved) <= new Date(dateRange.end));

        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Case Results</h2>}
        >
            <Head title="Case Results" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">All Case Results</h3>
                        <Link
                            href={route('admin.case-results.create')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add New Case Result
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6 space-y-4">
                            <div className="flex flex-wrap gap-4">
                                <SearchFilter
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Search case results..."
                                />
                                <DateRangeFilter
                                    startDate={dateRange.start}
                                    endDate={dateRange.end}
                                    onStartDateChange={(date) => setDateRange(prev => ({ ...prev, start: date }))}
                                    onEndDateChange={(date) => setDateRange(prev => ({ ...prev, end: date }))}
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
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date Resolved
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
                                    {filteredResults.map((result) => (
                                        <tr 
                                            key={result.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => window.location.href = route('admin.case-results.show', result.id)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {result.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {result.case_type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatAmount(result.amount)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(result.date_resolved)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    result.is_published 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {result.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('admin.case-results.edit', result.id)}
                                                    className="text-blue-600 hover:text-blue-900 mr-4"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route('admin.case-results.destroy', result.id)}
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
        </AuthenticatedLayout>
    );
}
