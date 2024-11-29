import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect, useRef, useState } from 'react';
import RichTextEditor from '@/Components/RichTextEditor';

const PRACTICE_AREAS = [
    'Personal Injury',
    'Criminal Defense',
    'Family Law',
    'Estate Planning',
    'Business Law',
    'Real Estate Law',
    'Employment Law',
    'Immigration Law',
    'Intellectual Property',
    'Tax Law',
];

export default function Form({ caseResult = null, action }) {
    const [showPreview, setShowPreview] = useState(false);
    const editorRef = useRef(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: caseResult?.title || '',
        date: caseResult?.date || '',
        amount: caseResult?.amount || '',
        description: caseResult?.description || '',
        practice_area: caseResult?.practice_area || '',
    });

    const formatAmount = (value) => {
        // Remove non-numeric characters
        const numericValue = value.replace(/[^0-9]/g, '');
        
        // Convert to cents, then format with commas and decimals
        const amount = (parseInt(numericValue) / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        return amount;
    };

    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        setData('amount', rawValue);
    };

    const submit = (e) => {
        e.preventDefault();
        if (caseResult) {
            put(route('admin.case-results.update', caseResult.id));
        } else {
            post(route('admin.case-results.store'));
        }
    };

    return (
        <div className="space-y-6">
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
                    <InputLabel htmlFor="date" value="Date" />
                    <TextInput
                        id="date"
                        type="date"
                        name="date"
                        value={data.date}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('date', e.target.value)}
                        required
                    />
                    <InputError message={errors.date} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="amount" value="Amount" />
                    <div className="relative mt-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <TextInput
                            id="amount"
                            type="text"
                            name="amount"
                            value={formatAmount(data.amount).replace('$', '')}
                            className="pl-7 mt-1 block w-full"
                            onChange={handleAmountChange}
                            required
                        />
                    </div>
                    <InputError message={errors.amount} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="practice_area" value="Practice Area" />
                    <div className="relative mt-1">
                        <input
                            id="practice_area"
                            type="text"
                            name="practice_area"
                            value={data.practice_area}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setData('practice_area', e.target.value)}
                            list="practice-areas"
                            required
                        />
                        <datalist id="practice-areas">
                            {PRACTICE_AREAS.map((area) => (
                                <option key={area} value={area} />
                            ))}
                        </datalist>
                    </div>
                    <InputError message={errors.practice_area} className="mt-2" />
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {caseResult ? 'Update Case Result' : 'Create Case Result'}
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
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {data.title || 'Case Title'}
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                {data.practice_area || 'Practice Area'} • {data.date ? new Date(data.date).toLocaleDateString() : 'Date'}
                            </p>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <div className="text-sm text-gray-900">
                                <div className="mb-4">
                                    <span className="font-bold text-2xl text-green-600">
                                        {formatAmount(data.amount)}
                                    </span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: data.description || 'Description' }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
