import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function Form({ resource = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: resource?.title || '',
        type: resource?.type || '',
        description: resource?.description || '',
        file: null,
        is_featured: resource?.is_featured || false,
        order: resource?.order || 0,
    });

    useEffect(() => {
        return () => {
            reset('title', 'type', 'description', 'file', 'is_featured', 'order');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (resource) {
            put(route('admin.client-resources.update', resource.id), {
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            post(route('admin.client-resources.store'));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
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
                <InputLabel htmlFor="type" value="Type" />
                <select
                    id="type"
                    name="type"
                    value={data.type}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    onChange={(e) => setData('type', e.target.value)}
                    required
                >
                    <option value="">Select a type</option>
                    <option value="Document">Document</option>
                    <option value="Video">Video</option>
                    <option value="Guide">Guide</option>
                    <option value="Form">Form</option>
                    <option value="Template">Template</option>
                </select>
                <InputError message={errors.type} className="mt-2" />
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
                <InputLabel htmlFor="file" value="File" />
                <input
                    id="file"
                    type="file"
                    name="file"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('file', e.target.files[0])}
                    required={!resource}
                />
                <InputError message={errors.file} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="is_featured"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Featured Resource</span>
                    </label>
                </div>
            </div>

            <div>
                <InputLabel htmlFor="order" value="Display Order" />
                <TextInput
                    id="order"
                    type="number"
                    name="order"
                    value={data.order}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('order', e.target.value)}
                />
                <InputError message={errors.order} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {resource ? 'Update Resource' : 'Create Resource'}
                </PrimaryButton>
            </div>
        </form>
    );
}
