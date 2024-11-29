import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState, useRef } from 'react';
import RichTextEditor from '@/Components/RichTextEditor';
import DateTimePicker from '@/Components/DateTimePicker';
import DurationPicker from '@/Components/DurationPicker';
import ResourceManager from '@/Components/ResourceManager';
import { formatCurrency } from '@/utils/format';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useFlashMessages from '@/Hooks/useFlashMessages';

export default function Create({ auth, categories, levels, series = [] }) {
    useFlashMessages();
    const [previewImages, setPreviewImages] = useState([]);
    const [featuredPreview, setFeaturedPreview] = useState(null);
    const editorRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        series_id: '',
        session_number: '',
        title: '',
        description: '',
        learning_outcomes: [],
        level: '',
        category: '',
        topics: [],
        video_url: '',
        meeting_url: '',
        scheduled_time: '',
        duration: 60, // Default 1 hour
        price: '',
        is_featured: false,
        is_published: false,
        is_live: false,
        resources: [],
        series_id: '',
        session_number: '',
        featured_image: null,
        additional_images: [],
    });

    useEffect(() => {
        return () => {
            reset();
            // Cleanup preview URLs
            previewImages.forEach(image => URL.revokeObjectURL(image.url));
            if (featuredPreview) URL.revokeObjectURL(featuredPreview);
        };
    }, []);

    const handleFeaturedImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedPreview(URL.createObjectURL(file));
            setData('featured_image', file);
        }
    };

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviewImages = files.map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setPreviewImages(prevImages => [...prevImages, ...newPreviewImages]);
        setData('additional_images', files);
    };

    const removeAdditionalImage = (index) => {
        setPreviewImages(prevImages => prevImages.filter((_, i) => i !== index));
        setData('additional_images', Array.from(data.additional_images).filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.legalnars.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Legalnar
                </h2>
            }
        >
            <Head title="Create Legalnar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 gap-6">
                        {/* Form Section */}
                        <div className="col-span-2">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <form onSubmit={submit} className="p-6 space-y-6" encType="multipart/form-data">
                                    {/* Basic Information */}
                                    <div className="space-y-6">
                                        <div>
                                            <InputLabel htmlFor="title" value="Title" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="description" value="Description" />
                                            <div className="mt-1">
                                                <RichTextEditor
                                                    ref={editorRef}
                                                    value={data.description}
                                                    onChange={(content) => setData('description', content)}
                                                />
                                            </div>
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>

                                        {/* Series Selection */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="series_id" value="Series" />
                                                <select
                                                    id="series_id"
                                                    value={data.series_id}
                                                    onChange={e => setData('series_id', e.target.value)}
                                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                >
                                                    <option value="">Select Series</option>
                                                    {series.map((s) => (
                                                        <option key={s.id} value={s.id}>{s.title}</option>
                                                    ))}
                                                </select>
                                                <InputError message={errors.series_id} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="session_number" value="Session Number" />
                                                <TextInput
                                                    id="session_number"
                                                    type="number"
                                                    min="1"
                                                    className="mt-1 block w-full"
                                                    value={data.session_number}
                                                    onChange={e => setData('session_number', e.target.value)}
                                                />
                                                <InputError message={errors.session_number} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Category and Level */}
                                        <div className="grid grid-cols-2 gap-4">
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
                                        </div>

                                        {/* Schedule Information */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <DateTimePicker
                                                label="Scheduled Time"
                                                value={data.scheduled_time}
                                                onChange={(value) => setData('scheduled_time', value)}
                                                error={errors.scheduled_time}
                                                required
                                            />

                                            <DurationPicker
                                                label="Duration"
                                                value={data.duration}
                                                onChange={(value) => setData('duration', value)}
                                                error={errors.duration}
                                            />
                                        </div>

                                        {/* URLs */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <InputLabel htmlFor="video_url" value="Video URL" />
                                                <TextInput
                                                    id="video_url"
                                                    type="url"
                                                    className="mt-1 block w-full"
                                                    value={data.video_url}
                                                    onChange={e => setData('video_url', e.target.value)}
                                                />
                                                <InputError message={errors.video_url} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="meeting_url" value="Meeting URL" />
                                                <TextInput
                                                    id="meeting_url"
                                                    type="url"
                                                    className="mt-1 block w-full"
                                                    value={data.meeting_url}
                                                    onChange={e => setData('meeting_url', e.target.value)}
                                                />
                                                <InputError message={errors.meeting_url} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div>
                                            <InputLabel htmlFor="price" value="Price" />
                                            <TextInput
                                                id="price"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.price}
                                                onChange={e => {
                                                    const value = e.target.value.replace(/[^0-9.]/g, '');
                                                    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
                                                        const numericValue = parseFloat(value);
                                                        if (!isNaN(numericValue) && numericValue >= 0) {
                                                            setData('price', value);
                                                        } else if (value === '') {
                                                            setData('price', '');
                                                        }
                                                    }
                                                }}
                                                placeholder="0.00"
                                            />
                                            <InputError message={errors.price} className="mt-2" />
                                        </div>

                                        {/* Resources */}
                                        <ResourceManager
                                            resources={data.resources}
                                            onChange={(resources) => setData('resources', resources)}
                                            error={errors.resources}
                                        />
                                    </div>

                                    {/* Media Section */}
                                    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-900">Media</h3>
                                        
                                        {/* Featured Image */}
                                        <div>
                                            <InputLabel htmlFor="featured_image" value="Featured Image" />
                                            <input
                                                id="featured_image"
                                                type="file"
                                                onChange={handleFeaturedImageChange}
                                                className="mt-1 block w-full"
                                                accept="image/*"
                                            />
                                            <InputError message={errors.featured_image} className="mt-2" />
                                            {featuredPreview && (
                                                <div className="mt-2">
                                                    <img
                                                        src={featuredPreview}
                                                        alt="Featured preview"
                                                        className="h-32 w-auto object-cover rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Additional Images */}
                                        <div>
                                            <InputLabel htmlFor="additional_images" value="Additional Images" />
                                            <input
                                                id="additional_images"
                                                type="file"
                                                onChange={handleAdditionalImagesChange}
                                                className="mt-1 block w-full"
                                                multiple
                                                accept="image/*"
                                            />
                                            <InputError message={errors.additional_images} className="mt-2" />
                                            {previewImages.length > 0 && (
                                                <div className="mt-2 grid grid-cols-3 gap-4">
                                                    {previewImages.map((image, index) => (
                                                        <div key={index} className="relative">
                                                            <img
                                                                src={image.url}
                                                                alt={`Preview ${index + 1}`}
                                                                className="h-24 w-full object-cover rounded-lg"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeAdditionalImage(index)}
                                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex items-center justify-end mt-4">
                                        <PrimaryButton className="ml-4" disabled={processing}>
                                            Create Legalnar
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Preview Section */}
                        <div className="col-span-1">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                                <div className="space-y-4">
                                    {featuredPreview && (
                                        <img
                                            src={featuredPreview}
                                            alt="Featured preview"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                    )}
                                    <h4 className="text-xl font-semibold">{data.title || 'Untitled Legalnar'}</h4>
                                    {data.scheduled_time && (
                                        <p className="text-gray-600">
                                            {new Date(data.scheduled_time).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                        </p>
                                    )}
                                    {data.duration && (
                                        <p className="text-gray-600">
                                            Duration: {Math.floor(data.duration / 60)}h {data.duration % 60}m
                                        </p>
                                    )}
                                    {data.price && (
                                        <p className="text-lg font-semibold text-gray-900">
                                            {formatCurrency(data.price)}
                                        </p>
                                    )}
                                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: data.description }} />
                                    
                                    {data.resources.length > 0 && (
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-2">Resources</h5>
                                            <ul className="space-y-2">
                                                {data.resources.map((resource, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <span className="text-gray-500">{resource.type}:</span>
                                                        <span className="text-blue-600 hover:underline">{resource.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
