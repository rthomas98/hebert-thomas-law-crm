import { useState } from 'react';
import { router } from '@inertiajs/react';
import { 
    TrashIcon, 
    CheckCircleIcon, 
    XCircleIcon,
    FolderIcon,
    TagIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function BulkActions({ selectedItems, setSelectedItems, type, categories = [] }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleBulkDelete = () => {
        if (confirm('Are you sure you want to delete the selected items?')) {
            router.post(route('bulk.delete'), {
                ids: selectedItems,
                type: type
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setSelectedItems([]);
                    toast.success('Items deleted successfully');
                }
            });
        }
    };

    const handleBulkStatus = (status) => {
        router.post(route('bulk.status'), {
            ids: selectedItems,
            type: type,
            status: status
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedItems([]);
                toast.success(`Items ${status} successfully`);
            }
        });
    };

    const handleBulkCategory = (category) => {
        router.post(route('bulk.category'), {
            ids: selectedItems,
            type: type,
            category: category
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedItems([]);
                toast.success('Category updated successfully');
            }
        });
    };

    const actions = [
        { value: 'publish', label: 'Publish' },
        { value: 'unpublish', label: 'Unpublish' },
        { value: 'delete', label: 'Delete' },
        ...categories.map(category => ({ value: category, label: `Set Category: ${category}` })),
    ];

    const onAction = (action) => {
        switch (action) {
            case 'publish':
                handleBulkStatus('published');
                break;
            case 'unpublish':
                handleBulkStatus('draft');
                break;
            case 'delete':
                handleBulkDelete();
                break;
            default:
                handleBulkCategory(action);
        }
    };

    if (selectedItems.length === 0) return null;

    return (
        <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
            <span className="text-sm text-gray-700">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </span>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Actions
                    <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </Menu.Button>

                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {actions.map((action) => (
                            <Menu.Item key={action.value}>
                                {({ active }) => (
                                    <button
                                        onClick={() => onAction(action.value)}
                                        className={`${
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } block w-full text-left px-4 py-2 text-sm`}
                                    >
                                        {action.label}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    );
}
