import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function Form({ insight = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: insight?.title || '',
        category: insight?.category || '',
        content: insight?.content || '',
        published_at: insight?.published_at || '',
        meta_description: insight?.meta_description || '',
        featured_image: null,
    });

    useEffect(() => {
        return () => {
            reset('title', 'category', 'content', 'published_at', 'meta_description', 'featured_image');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (insight) {
            put(route('admin.insights.update', insight.id), {
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            post(route('admin.insights.store'));
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
                    <option value="Legal Updates">Legal Updates</option>
                    <option value="Industry News">Industry News</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Tips & Advice">Tips & Advice</option>
                </select>
                <InputError message={errors.category} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="content" value="Content" />
                <textarea
                    id="content"
                    name="content"
                    value={data.content}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    rows="10"
                    onChange={(e) => setData('content', e.target.value)}
                    required
                />
                <InputError message={errors.content} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="meta_description" value="Meta Description" />
                <textarea
                    id="meta_description"
                    name="meta_description"
                    value={data.meta_description}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    rows="2"
                    onChange={(e) => setData('meta_description', e.target.value)}
                    required
                />
                <InputError message={errors.meta_description} className="mt-2" />
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

            <div>
                <InputLabel htmlFor="featured_image" value="Featured Image" />
                <input
                    id="featured_image"
                    type="file"
                    name="featured_image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('featured_image', e.target.files[0])}
                />
                <InputError message={errors.featured_image} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {insight ? 'Update Insight' : 'Create Insight'}
                </PrimaryButton>
            </div>
        </form>
    );
}
