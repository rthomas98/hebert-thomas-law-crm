import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function Form({ series = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: series?.title || '',
        description: series?.description || '',
        learning_outcomes: series?.learning_outcomes || '',
        level: series?.level || '',
        category: series?.category || '',
        topics: series?.topics || [],
        price: series?.price || '',
        is_featured: series?.is_featured || false,
        is_published: series?.is_published || false,
        published_at: series?.published_at || '',
        instructor_id: series?.instructor_id || '',
        image: null,
        _method: series ? 'PUT' : 'POST',
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (series) {
            post(route('admin.legalnar-series.update', series.id), {
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            post(route('admin.legalnar-series.store'));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
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

            <div>
                <InputLabel htmlFor="image" value="Series Image" />
                <input
                    id="image"
                    type="file"
                    name="image"
                    onChange={(e) => setData('image', e.target.files[0])}
                    className="mt-1 block w-full"
                    accept="image/*"
                />
                <InputError message={errors.image} className="mt-2" />
                {series?.image && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">Current image:</p>
                        <img
                            src={series.image}
                            alt="Series"
                            className="mt-1 h-32 w-auto object-cover rounded-lg"
                        />
                    </div>
                )}
            </div>

            <div>
                <InputLabel htmlFor="learning_outcomes" value="Learning Outcomes" />
                <textarea
                    id="learning_outcomes"
                    name="learning_outcomes"
                    value={data.learning_outcomes}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    rows="4"
                    onChange={(e) => setData('learning_outcomes', e.target.value)}
                    required
                />
                <InputError message={errors.learning_outcomes} className="mt-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <InputLabel htmlFor="level" value="Level" />
                    <select
                        id="level"
                        name="level"
                        value={data.level}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData('level', e.target.value)}
                        required
                    >
                        <option value="">Select a level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                    <InputError message={errors.level} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="category" value="Category" />
                    <select
                        id="category"
                        name="category"
                        value={data.category}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData('category', e.target.value)}
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Criminal Law">Criminal Law</option>
                        <option value="Civil Law">Civil Law</option>
                        <option value="Family Law">Family Law</option>
                        <option value="Business Law">Business Law</option>
                        <option value="Constitutional Law">Constitutional Law</option>
                    </select>
                    <InputError message={errors.category} className="mt-2" />
                </div>
            </div>

            <div>
                <InputLabel htmlFor="price" value="Price" />
                <TextInput
                    id="price"
                    type="number"
                    name="price"
                    value={data.price}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('price', e.target.value)}
                    step="0.01"
                    required
                />
                <InputError message={errors.price} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="is_featured"
                        checked={data.is_featured}
                        onChange={(e) => setData('is_featured', e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Featured Series</span>
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="is_published"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">Published</span>
                </label>
            </div>

            <div>
                <InputLabel htmlFor="published_at" value="Publish Date" />
                <TextInput
                    id="published_at"
                    type="datetime-local"
                    name="published_at"
                    value={data.published_at}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('published_at', e.target.value)}
                />
                <InputError message={errors.published_at} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {series ? 'Update Series' : 'Create Series'}
                </PrimaryButton>
            </div>
        </form>
    );
}
