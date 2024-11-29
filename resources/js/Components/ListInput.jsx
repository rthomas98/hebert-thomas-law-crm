import { useState } from 'react';

export default function ListInput({ value = [], onChange, placeholder = "Add item..." }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onChange([...value, input.trim()]);
            setInput('');
        }
    };

    const removeItem = (index) => {
        const newItems = [...value];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    const moveItem = (index, direction) => {
        if ((direction === -1 && index === 0) || (direction === 1 && index === value.length - 1)) {
            return;
        }
        const newItems = [...value];
        const item = newItems[index];
        newItems.splice(index, 1);
        newItems.splice(index + direction, 0, item);
        onChange(newItems);
    };

    return (
        <div className="space-y-2">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder={placeholder}
                />
                <button
                    type="submit"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add
                </button>
            </form>

            <ul className="space-y-2">
                {value.map((item, index) => (
                    <li
                        key={index}
                        className="group flex items-center gap-2 p-2 rounded-md hover:bg-gray-50"
                    >
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                onClick={() => moveItem(index, -1)}
                                disabled={index === 0}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            >
                                ↑
                            </button>
                            <button
                                type="button"
                                onClick={() => moveItem(index, 1)}
                                disabled={index === value.length - 1}
                                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            >
                                ↓
                            </button>
                        </div>
                        <span className="flex-1">{item}</span>
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-600"
                        >
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
