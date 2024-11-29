import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState } from 'react';

export default function Edit({ auth, legalnar, series }) {
    const [previewImages, setPreviewImages] = useState([]);
    const [featuredPreview, setFeaturedPreview] = useState(legalnar.featured_image);

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
        featured_image: null,
        additional_images: [],
        _method: 'PATCH',
    });

    useEffect(() => {
        // Initialize additional images preview if they exist
        if (legalnar.additional_images) {
            setPreviewImages(
                legalnar.additional_images.map(url => ({
                    url,
                    name: url.split('/').pop()
                }))
            );
        }

        return () => {
            reset();
            // Cleanup preview URLs
            previewImages.forEach(image => {
                if (!legalnar.additional_images?.includes(image.url)) {
                    URL.revokeObjectURL(image.url);
                }
            });
            if (featuredPreview && featuredPreview !== legalnar.featured_image) {
                URL.revokeObjectURL(featuredPreview);
            }
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
        patch(route('admin.legalnars.update', legalnar.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Legalnar: {legalnar.title}
                </h2>
            }
        >
            <Head title={`Edit Legalnar: ${legalnar.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                    <textarea
                                        id="description"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows="4"
                                        required
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
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
                                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {previewImages.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={image.url}
                                                        alt={image.name}
                                                        className="h-32 w-full object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAdditionalImage(index)}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                    >
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Video URL */}
                                <div>
                                    <InputLabel htmlFor="video_url" value="Video URL" />
                                    <TextInput
                                        id="video_url"
                                        type="url"
                                        className="mt-1 block w-full"
                                        value={data.video_url}
                                        onChange={e => setData('video_url', e.target.value)}
                                        placeholder="Enter YouTube or Vimeo URL"
                                    />
                                    <InputError message={errors.video_url} className="mt-2" />
                                </div>
                            </div>

                            {/* Series */}
                            <div className="mt-4">
                                <InputLabel htmlFor="series_id" value="Series" />
                                <select
                                    id="series_id"
                                    name="series_id"
                                    value={data.series_id}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={(e) => setData('series_id', e.target.value)}
                                >
                                    <option value="">Select a series</option>
                                    {series.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.title}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.series_id} className="mt-2" />
                            </div>

                            {/* Level */}
                            <div className="mt-4">
                                <InputLabel htmlFor="level" value="Level" />
                                <select
                                    id="level"
                                    name="level"
                                    value={data.level}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={(e) => setData('level', e.target.value)}
                                    required
                                >
                                    <option value="">Select a level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                                <InputError message={errors.level} className="mt-2" />
                            </div>

                            {/* Scheduled Time */}
                            <div className="mt-4">
                                <InputLabel htmlFor="scheduled_time" value="Scheduled Time" />
                                <TextInput
                                    id="scheduled_time"
                                    type="datetime-local"
                                    name="scheduled_time"
                                    value={data.scheduled_time}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('scheduled_time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.scheduled_time} className="mt-2" />
                            </div>

                            {/* Duration */}
                            <div className="mt-4">
                                <InputLabel htmlFor="duration" value="Duration (minutes)" />
                                <TextInput
                                    id="duration"
                                    type="number"
                                    name="duration"
                                    value={data.duration}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('duration', e.target.value)}
                                    required
                                />
                                <InputError message={errors.duration} className="mt-2" />
                            </div>

                            {/* Price */}
                            <div className="mt-4">
                                <InputLabel htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={data.price}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            {/* Live Session */}
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_live"
                                        checked={data.is_live}
                                        onChange={(e) => setData('is_live', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Live Session</span>
                                </label>
                            </div>

                            {/* Featured */}
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_featured"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Featured</span>
                                </label>
                            </div>

                            {/* Published */}
                            <div className="mt-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_published"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Published</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Update Legalnar
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
