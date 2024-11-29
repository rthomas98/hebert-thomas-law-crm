import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function DurationPicker({ label, value, onChange, error }) {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const handleChange = (type, val) => {
        let newValue;
        if (type === 'hours') {
            newValue = (parseInt(val) || 0) * 60 + minutes;
        } else {
            newValue = hours * 60 + (parseInt(val) || 0);
        }
        onChange(newValue);
    };

    return (
        <div>
            <InputLabel value={label} />
            <div className="flex gap-4 mt-1">
                <div className="flex-1">
                    <input
                        type="number"
                        min="0"
                        value={hours}
                        onChange={(e) => handleChange('hours', e.target.value)}
                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        placeholder="Hours"
                    />
                    <span className="text-sm text-gray-500 mt-1 block">Hours</span>
                </div>
                <div className="flex-1">
                    <input
                        type="number"
                        min="0"
                        max="59"
                        value={minutes}
                        onChange={(e) => handleChange('minutes', e.target.value)}
                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        placeholder="Minutes"
                    />
                    <span className="text-sm text-gray-500 mt-1 block">Minutes</span>
                </div>
            </div>
            <InputError message={error} className="mt-2" />
        </div>
    );
}
