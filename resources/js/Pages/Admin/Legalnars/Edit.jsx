import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import MediaLibrary from '@/Components/Admin/MediaLibrary';
import SEOTools from '@/Components/Admin/SEOTools';
import RichTextEditor from '@/Components/Admin/RichTextEditor';
import ContentPreview from '@/Components/Admin/ContentPreview';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useFlashMessages from '@/Hooks/useFlashMessages';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Edit({ auth, legalnar, categories, levels }) {
    useFlashMessages();
    const [selectedTab, setSelectedTab] = useState(0);
    const [showMediaLibrary, setShowMediaLibrary] = useState(false);
    const [mediaType, setMediaType] = useState(null); // 'featured' or 'additional'

    const { data, setData, patch, processing, errors, reset } = useForm({
        title: legalnar.title,
        description: legalnar.description,
        learning_outcomes: legalnar.learning_outcomes || [],
        level: legalnar.level,
        category: legalnar.category,
        topics: legalnar.topics || [],
        video_url: legalnar.video_url || '',
        meeting_url: legalnar.meeting_url || '',
        scheduled_time: legalnar.scheduled_time,
        duration: legalnar.duration,
        price: legalnar.price,
        is_featured: legalnar.is_featured,
        is_published: legalnar.is_published,
        is_live: legalnar.is_live,
        resources: legalnar.resources || [],
        series_id: legalnar.series_id || '',
        session_number: legalnar.session_number || '',
        featured_image: legalnar.featured_image || '',
        additional_images: legalnar.additional_images || [],
        _method: 'PATCH',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.legalnars.update', legalnar.id));
    };

    const handleMediaSelect = (selectedMedia) => {
        if (mediaType === 'featured') {
            setData('featured_image', selectedMedia.url);
        } else if (mediaType === 'additional') {
            setData('additional_images', [...data.additional_images, selectedMedia.url]);
        }
        setShowMediaLibrary(false);
    };

    const removeAdditionalImage = (indexToRemove) => {
        setData('additional_images', data.additional_images.filter((_, index) => index !== indexToRemove));
    };

    const tabPanels = [
        {
            name: 'Basic Info',
            content: (
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    {/* Description */}
                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <RichTextEditor
                            value={data.description}
                            onChange={(content) => setData('description', content)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    {/* Basic Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="level" value="Level" />
                            <select
                                id="level"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.level}
                                onChange={(e) => setData('level', e.target.value)}
                            >
                                <option value="">Select Level</option>
                                {Object.entries(levels).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.level} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="category" value="Category" />
                            <select
                                id="category"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {Object.entries(categories).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.category} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="price" value="Price" />
                            <TextInput
                                id="price"
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="duration" value="Duration (minutes)" />
                            <TextInput
                                id="duration"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.duration}
                                onChange={(e) => setData('duration', e.target.value)}
                            />
                            <InputError message={errors.duration} className="mt-2" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            name: 'Media',
            content: (
                <div className="space-y-6">
                    {/* Featured Image */}
                    <div>
                        <InputLabel value="Featured Image" />
                        <div className="mt-2">
                            {data.featured_image ? (
                                <div className="relative">
                                    <img
                                        src={data.featured_image}
                                        alt="Featured"
                                        className="max-w-xs rounded-lg"
                                    />
                                    <button
                                        onClick={() => setData('featured_image', '')}
                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMediaType('featured');
                                        setShowMediaLibrary(true);
                                    }}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Select Featured Image
                                </button>
                            )}
                        </div>
                        <InputError message={errors.featured_image} className="mt-2" />
                    </div>

                    {/* Additional Images */}
                    <div>
                        <InputLabel value="Additional Images" />
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {data.additional_images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`Additional ${index + 1}`}
                                        className="rounded-lg"
                                    />
                                    <button
                                        onClick={() => removeAdditionalImage(index)}
                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setMediaType('additional');
                                    setShowMediaLibrary(true);
                                }}
                                className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
                            >
                                <PlusIcon className="h-8 w-8 text-gray-400" />
                            </button>
                        </div>
                        <InputError message={errors.additional_images} className="mt-2" />
                    </div>
                </div>
            ),
        },
        {
            name: 'SEO',
            content: (
                <SEOTools
                    modelType="legalnars"
                    modelId={legalnar.id}
                />
            ),
        },
        {
            name: 'Preview',
            content: (
                <ContentPreview
                    type="legalnar"
                    data={data}
                />
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Legalnar
                </h2>
            }
        >
            <Head title="Edit Legalnar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6">
                            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                                <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1">
                                    {tabPanels.map((panel) => (
                                        <Tab
                                            key={panel.name}
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white text-indigo-700 shadow'
                                                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                                                )
                                            }
                                        >
                                            {panel.name}
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Tab.Panels className="mt-6">
                                    {tabPanels.map((panel, idx) => (
                                        <Tab.Panel
                                            key={idx}
                                            className={classNames(
                                                'rounded-xl bg-white',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                            )}
                                        >
                                            {panel.content}
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                            <div className="mt-6 flex justify-end">
                                <PrimaryButton type="submit" disabled={processing}>
                                    Save Changes
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Media Library Modal */}
            {showMediaLibrary && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <MediaLibrary
                                    onSelect={handleMediaSelect}
                                    multiple={mediaType === 'additional'}
                                />
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => setShowMediaLibrary(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
