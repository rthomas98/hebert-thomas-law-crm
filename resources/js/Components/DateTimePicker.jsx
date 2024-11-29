import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function DateTimePicker({ label, value, onChange, error, required = false }) {
    return (
        <div>
            <InputLabel htmlFor="datetime" value={label} />
            <input
                type="datetime-local"
                id="datetime"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                required={required}
            />
            <InputError message={error} className="mt-2" />
        </div>
    );
}
