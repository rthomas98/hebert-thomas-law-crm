import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { DragDropContext, Droppable, Draggable } from '@dnd-kit/core';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ResourceManager({ resources, onChange, error }) {
    const handleAdd = () => {
        onChange([...resources, { title: '', url: '', type: 'link' }]);
    };

    const handleRemove = (index) => {
        onChange(resources.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        const newResources = [...resources];
        newResources[index] = { ...newResources[index], [field]: value };
        onChange(newResources);
    };

    return (
        <div className="space-y-4">
            <InputLabel value="Resources" />
            
            <div className="space-y-4">
                {resources.map((resource, index) => (
                    <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                        <div className="flex-1 space-y-4">
                            <div>
                                <input
                                    type="text"
                                    value={resource.title}
                                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    placeholder="Resource Title"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={resource.url}
                                    onChange={(e) => handleChange(index, 'url', e.target.value)}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    placeholder="Resource URL"
                                />
                            </div>
                            <div>
                                <select
                                    value={resource.type}
                                    onChange={(e) => handleChange(index, 'type', e.target.value)}
                                    className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                >
                                    <option value="link">Link</option>
                                    <option value="pdf">PDF</option>
                                    <option value="video">Video</option>
                                    <option value="document">Document</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="p-2 text-gray-500 hover:text-red-500"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Add Resource
            </button>
            
            <InputError message={error} className="mt-2" />
        </div>
    );
}
