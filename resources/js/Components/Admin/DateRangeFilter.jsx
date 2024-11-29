import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function DateRangeFilter({ startDate = '', endDate = '', onStartDateChange, onEndDateChange, url, filters, setFilters }) {
    const [internalStartDate, setInternalStartDate] = useState(startDate);
    const [internalEndDate, setInternalEndDate] = useState(endDate);

    useEffect(() => {
        setInternalStartDate(startDate);
        setInternalEndDate(endDate);
    }, [startDate, endDate]);

    const handleStartDateChange = (date) => {
        setInternalStartDate(date);
        if (url && filters) {
            router.get(url, { ...filters, startDate: date }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
            if (setFilters) {
                setFilters(prev => ({ ...prev, startDate: date }));
            }
        }
        if (onStartDateChange) {
            onStartDateChange(date);
        }
    };

    const handleEndDateChange = (date) => {
        setInternalEndDate(date);
        if (url && filters) {
            router.get(url, { ...filters, endDate: date }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
            if (setFilters) {
                setFilters(prev => ({ ...prev, endDate: date }));
            }
        }
        if (onEndDateChange) {
            onEndDateChange(date);
        }
    };

    return (
        <div className="flex gap-4 items-center">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="date"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={internalStartDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    placeholder="Start date"
                />
            </div>
            <span className="text-gray-500">to</span>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="date"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={internalEndDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    placeholder="End date"
                    min={internalStartDate}
                />
            </div>
        </div>
    );
}
