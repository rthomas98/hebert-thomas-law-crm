import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function SEOTools({ modelType, modelId, initialData = {} }) {
    const [data, setData] = useState({
        meta_title: '',
        meta_description: '',
        meta_keywords: [],
        og_title: '',
        og_description: '',
        og_image: '',
        canonical_url: '',
        ...initialData
    });
    const [errors, setErrors] = useState({});
    const [titleLength, setTitleLength] = useState(0);
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadSEOData();
    }, [modelType, modelId]);

    useEffect(() => {
        setTitleLength(data.meta_title?.length || 0);
        setDescriptionLength(data.meta_description?.length || 0);
    }, [data.meta_title, data.meta_description]);

    const loadSEOData = async () => {
        try {
            const response = await router.get(route('seo.show', [modelType, modelId]));
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Failed to load SEO data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        router.post(route('seo.store'), {
            model_type: modelType,
            model_id: modelId,
            ...data
        }, {
            preserveState: true,
            onSuccess: () => {
                toast.success('SEO data saved successfully');
            },
            onError: (errors) => {
                setErrors(errors);
            }
        });
    };

    const addKeyword = (e) => {
        e.preventDefault();
        if (keyword.trim() && !data.meta_keywords.includes(keyword.trim())) {
            setData({
                ...data,
                meta_keywords: [...data.meta_keywords, keyword.trim()]
            });
            setKeyword('');
        }
    };

    const removeKeyword = (keywordToRemove) => {
        setData({
            ...data,
            meta_keywords: data.meta_keywords.filter(k => k !== keywordToRemove)
        });
    };

    const getProgressColor = (current, min, max) => {
        if (current < min) return 'text-yellow-500';
        if (current > max) return 'text-red-500';
        return 'text-green-500';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meta Title */}
            <div>
                <div className="flex justify-between">
                    <InputLabel htmlFor="meta_title" value="Meta Title" />
                    <span className={`text-sm ${getProgressColor(titleLength, 30, 60)}`}>
                        {titleLength}/60 characters
                    </span>
                </div>
                <TextInput
                    id="meta_title"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.meta_title}
                    onChange={(e) => setData({ ...data, meta_title: e.target.value })}
                    maxLength="60"
                />
                <InputError message={errors.meta_title} className="mt-2" />
                <p className="mt-1 text-sm text-gray-500">
                    Recommended length: 30-60 characters
                </p>
            </div>

            {/* Meta Description */}
            <div>
                <div className="flex justify-between">
                    <InputLabel htmlFor="meta_description" value="Meta Description" />
                    <span className={`text-sm ${getProgressColor(descriptionLength, 120, 160)}`}>
                        {descriptionLength}/160 characters
                    </span>
                </div>
                <textarea
                    id="meta_description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={data.meta_description}
                    onChange={(e) => setData({ ...data, meta_description: e.target.value })}
                    maxLength="160"
                    rows="3"
                />
                <InputError message={errors.meta_description} className="mt-2" />
                <p className="mt-1 text-sm text-gray-500">
                    Recommended length: 120-160 characters
                </p>
            </div>

            {/* Meta Keywords */}
            <div>
                <InputLabel htmlFor="meta_keywords" value="Meta Keywords" />
                <div className="mt-2 flex flex-wrap gap-2">
                    {data.meta_keywords.map((kw, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                            {kw}
                            <button
                                type="button"
                                onClick={() => removeKeyword(kw)}
                                className="ml-1 inline-flex items-center p-0.5 text-indigo-400 hover:text-indigo-600"
                            >
                                <TrashIcon className="h-3 w-3" />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="mt-2 flex">
                    <TextInput
                        id="keyword"
                        type="text"
                        className="block w-full"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Add a keyword"
                    />
                    <button
                        type="button"
                        onClick={addKeyword}
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Add
                    </button>
                </div>
                <InputError message={errors.meta_keywords} className="mt-2" />
            </div>

            {/* Open Graph Title */}
            <div>
                <InputLabel htmlFor="og_title" value="Open Graph Title" />
                <TextInput
                    id="og_title"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.og_title}
                    onChange={(e) => setData({ ...data, og_title: e.target.value })}
                />
                <InputError message={errors.og_title} className="mt-2" />
            </div>

            {/* Open Graph Description */}
            <div>
                <InputLabel htmlFor="og_description" value="Open Graph Description" />
                <textarea
                    id="og_description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={data.og_description}
                    onChange={(e) => setData({ ...data, og_description: e.target.value })}
                    rows="3"
                />
                <InputError message={errors.og_description} className="mt-2" />
            </div>

            {/* Open Graph Image */}
            <div>
                <InputLabel htmlFor="og_image" value="Open Graph Image URL" />
                <TextInput
                    id="og_image"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.og_image}
                    onChange={(e) => setData({ ...data, og_image: e.target.value })}
                />
                <InputError message={errors.og_image} className="mt-2" />
            </div>

            {/* Canonical URL */}
            <div>
                <InputLabel htmlFor="canonical_url" value="Canonical URL" />
                <TextInput
                    id="canonical_url"
                    type="text"
                    className="mt-1 block w-full"
                    value={data.canonical_url}
                    onChange={(e) => setData({ ...data, canonical_url: e.target.value })}
                />
                <InputError message={errors.canonical_url} className="mt-2" />
            </div>

            {/* Preview */}
            <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-900">Search Preview</h4>
                <div className="mt-2 p-4 border border-gray-200 rounded-lg">
                    <div className="text-blue-800 text-xl hover:underline cursor-pointer">
                        {data.meta_title || 'Title'}
                    </div>
                    <div className="text-green-700 text-sm mt-1">
                        {window.location.origin}/{modelType}/{modelId}
                    </div>
                    <div className="text-gray-600 text-sm mt-1">
                        {data.meta_description || 'Description'}
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save SEO Settings
                </button>
            </div>
        </form>
    );
}
