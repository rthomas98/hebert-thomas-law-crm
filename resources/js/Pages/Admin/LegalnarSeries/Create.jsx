import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect } from 'react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        learning_outcomes: [],
        level: '',
        category: '',
        topics: [],
        thumbnail_path: '',
        price: '',
        is_featured: false,
        is_published: false,
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.legalnar-series.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Legalnar Series
                </h2>
            }
        >
            <Head title="Create Legalnar Series" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="p-6">
                            <div className="mt-4">
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

                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

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

                            <div className="mt-4">
                                <InputLabel htmlFor="category" value="Category" />
                                <TextInput
                                    id="category"
                                    type="text"
                                    name="category"
                                    value={data.category}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('category', e.target.value)}
                                    required
                                />
                                <InputError message={errors.category} className="mt-2" />
                            </div>

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

                            <div className="mt-4">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Create Series
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
