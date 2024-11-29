import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect, useState, useRef } from 'react';
import RichTextEditor from '@/Components/RichTextEditor';
import TagInput from '@/Components/TagInput';
import ListInput from '@/Components/ListInput';

const CATEGORIES = [
    'Criminal Law',
    'Civil Law',
    'Family Law',
    'Business Law',
    'Constitutional Law',
    'Environmental Law',
    'Intellectual Property',
    'International Law',
    'Labor Law',
    'Tax Law'
];

const TOPICS = [
    'Legal Research',
    'Legal Writing',
    'Trial Advocacy',
    'Negotiation',
    'Client Communication',
    'Ethics',
    'Technology in Law',
    'Case Analysis',
    'Document Drafting',
    'Court Procedures'
];

export default function Form({ series = null }) {
    const [imagePreview, setImagePreview] = useState(series?.image || null);
    const [showPreview, setShowPreview] = useState(false);
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: series?.title || '',
        description: series?.description || '',
        learning_outcomes: series?.learning_outcomes ? JSON.parse(series.learning_outcomes) : [],
        level: series?.level || '',
        category: series?.category || '',
        topics: series?.topics ? JSON.parse(series.topics) : [],
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
            if (imagePreview && imagePreview !== series?.image) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            setImagePreview(URL.createObjectURL(file));
            setData('image', file);
        }
    };

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
        setData('image', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatPrice = (value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        return (parseInt(numericValue) / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    const handlePriceChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        setData('price', rawValue);
    };

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
        <div className="space-y-6">
            <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                <div className="space-y-6">
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
                        <div className="mt-1">
                            <RichTextEditor
                                ref={editorRef}
                                value={data.description}
                                onChange={(content) => setData('description', content)}
                            />
                        </div>
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900">Series Image</h3>
                        <div>
                            <InputLabel htmlFor="image" value="Cover Image" />
                            <div className="mt-2 flex items-center gap-4">
                                <input
                                    ref={fileInputRef}
                                    id="image"
                                    type="file"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Choose Image
                                </button>
                                {imagePreview && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <InputError message={errors.image} className="mt-2" />
                            {imagePreview && (
                                <div className="mt-4">
                                    <img
                                        src={imagePreview}
                                        alt="Series preview"
                                        className="h-48 w-auto object-cover rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="learning_outcomes" value="Learning Outcomes" />
                        <div className="mt-1">
                            <ListInput
                                value={data.learning_outcomes}
                                onChange={(outcomes) => setData('learning_outcomes', outcomes)}
                                placeholder="Add a learning outcome..."
                            />
                        </div>
                        <InputError message={errors.learning_outcomes} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
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
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                onChange={(e) => setData('category', e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                {CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.category} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="topics" value="Topics" />
                        <div className="mt-1">
                            <TagInput
                                value={data.topics}
                                onChange={(topics) => setData('topics', topics)}
                                suggestions={TOPICS}
                                placeholder="Add topics..."
                            />
                        </div>
                        <InputError message={errors.topics} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="price" value="Price" />
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <TextInput
                                id="price"
                                type="text"
                                name="price"
                                value={formatPrice(data.price).replace('$', '')}
                                className="pl-7 mt-1 block w-full"
                                onChange={handlePriceChange}
                                required
                            />
                        </div>
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
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {series ? 'Update Series' : 'Create Series'}
                    </PrimaryButton>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </button>
                </div>
            </form>

            {showPreview && (
                <div className="mt-8 border-t pt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="relative">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt={data.title}
                                    className="w-full h-64 object-cover"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h2 className="text-2xl font-bold">{data.title}</h2>
                                <div className="mt-2 flex items-center gap-4">
                                    <span className="px-2 py-1 text-sm bg-white/20 rounded">
                                        {data.level}
                                    </span>
                                    <span className="px-2 py-1 text-sm bg-white/20 rounded">
                                        {data.category}
                                    </span>
                                    <span className="text-xl font-bold">
                                        {formatPrice(data.price)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: data.description }} />
                            
                            {data.learning_outcomes.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Learning Outcomes</h3>
                                    <ul className="list-disc pl-5 space-y-2">
                                        {data.learning_outcomes.map((outcome, index) => (
                                            <li key={index}>{outcome}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {data.topics.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Topics Covered</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {data.topics.map((topic, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
