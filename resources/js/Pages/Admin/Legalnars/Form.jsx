import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect, useState } from 'react';

export default function Form({ legalnar = null, series = [] }) {
    const [previewImages, setPreviewImages] = useState([]);
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        series_id: legalnar?.series_id || '',
        session_number: legalnar?.session_number || '',
        title: legalnar?.title || '',
        description: legalnar?.description || '',
        what_you_will_learn: legalnar?.what_you_will_learn || '',
        level: legalnar?.level || '',
        category: legalnar?.category || '',
        topics: legalnar?.topics || [],
        video_url: legalnar?.video_url || '',
        meeting_url: legalnar?.meeting_url || '',
        scheduled_at: legalnar?.scheduled_at || '',
        duration_minutes: legalnar?.duration_minutes || '',
        price: legalnar?.price || '',
        is_featured: legalnar?.is_featured || false,
        is_published: legalnar?.is_published || false,
        is_live: legalnar?.is_live || false,
        published_at: legalnar?.published_at || '',
        resources: legalnar?.resources || [],
        instructor_id: legalnar?.instructor_id || '',
        featured_image: null,
        additional_images: [],
        _method: legalnar ? 'PUT' : 'POST',
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const handleImagePreview = (files) => {
        const newPreviewImages = Array.from(files).map(file => ({
            url: URL.createObjectURL(file),
            name: file.name
        }));
        setPreviewImages(prevImages => [...prevImages, ...newPreviewImages]);
    };

    const removeImage = (index) => {
        setPreviewImages(prevImages => prevImages.filter((_, i) => i !== index));
        setData('additional_images', Array.from(data.additional_images).filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();
        if (legalnar) {
            post(route('admin.legalnars.update', legalnar.id), {
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            post(route('admin.legalnars.store'));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel htmlFor="series_id" value="Series" />
                    <select
                        id="series_id"
                        name="series_id"
                        value={data.series_id}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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

                <div>
                    <InputLabel htmlFor="session_number" value="Session Number" />
                    <TextInput
                        id="session_number"
                        type="number"
                        name="session_number"
                        value={data.session_number}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('session_number', e.target.value)}
                    />
                    <InputError message={errors.session_number} className="mt-2" />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('title', e.target.value)}
                    required
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    rows="4"
                    onChange={(e) => setData('description', e.target.value)}
                    required
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            {/* Media Section */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Media</h3>
                
                <div>
                    <InputLabel htmlFor="featured_image" value="Featured Image" />
                    <input
                        id="featured_image"
                        type="file"
                        name="featured_image"
                        onChange={(e) => setData('featured_image', e.target.files[0])}
                        className="mt-1 block w-full"
                        accept="image/*"
                    />
                    <InputError message={errors.featured_image} className="mt-2" />
                    {legalnar?.featured_image && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Current featured image:</p>
                            <img
                                src={legalnar.featured_image}
                                alt="Featured"
                                className="mt-1 h-32 w-auto object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <InputLabel htmlFor="additional_images" value="Additional Images" />
                    <input
                        id="additional_images"
                        type="file"
                        name="additional_images"
                        onChange={(e) => {
                            setData('additional_images', e.target.files);
                            handleImagePreview(e.target.files);
                        }}
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
                                        onClick={() => removeImage(index)}
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

                <div>
                    <InputLabel htmlFor="video_url" value="Video URL" />
                    <TextInput
                        id="video_url"
                        type="url"
                        name="video_url"
                        value={data.video_url}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('video_url', e.target.value)}
                        placeholder="Enter YouTube or Vimeo URL"
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>
            </div>

            {/* Existing fields */}
            {{ ... }}

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {legalnar ? 'Update Legalnar' : 'Create Legalnar'}
                </PrimaryButton>
            </div>
        </form>
    );
}
