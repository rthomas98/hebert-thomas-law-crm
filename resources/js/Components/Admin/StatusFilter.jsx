import { router } from '@inertiajs/react';

export default function StatusFilter({ url, filters, setFilters, value, onChange, options = [] }) {
    const handleStatusChange = (status) => {
        if (url && filters) {
            router.get(url, { ...filters, status }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
            if (setFilters) {
                setFilters(prev => ({ ...prev, status }));
            }
        }
        if (onChange) {
            onChange(status);
        }
    };

    const defaultOptions = [
        { value: '', label: 'All Status' },
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'scheduled', label: 'Scheduled' }
    ];

    const displayOptions = options.length > 0 ? options : defaultOptions;
    const currentValue = value || (filters?.status || '');

    return (
        <div className="flex items-center space-x-2">
            <select
                value={currentValue}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                {displayOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
