import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ListInput({ label, value = [], onChange, error }) {
    const [newItem, setNewItem] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (newItem.trim()) {
            onChange([...value, newItem.trim()]);
            setNewItem('');
        }
    };

    const handleRemove = (index) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange(newValue);
    };

    return (
        <div className="space-y-2">
            <InputLabel value={label} />
            <div className="flex gap-2">
                <TextInput
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAdd(e);
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>
            {error && <InputError message={error} />}
            <div className="space-y-2">
                {value.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                        <span className="flex-1">{item}</span>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="p-1 text-red-600 hover:text-red-800"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
