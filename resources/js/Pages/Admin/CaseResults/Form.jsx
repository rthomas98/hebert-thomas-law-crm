import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function Form({ caseResult = null, action }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: caseResult?.title || '',
        date: caseResult?.date || '',
        amount: caseResult?.amount || '',
        description: caseResult?.description || '',
        practice_area: caseResult?.practice_area || '',
    });

    useEffect(() => {
        return () => {
            reset('title', 'date', 'amount', 'description', 'practice_area');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        if (caseResult) {
            put(route('admin.case-results.update', caseResult.id));
        } else {
            post(route('admin.case-results.store'));
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
                <TextInput
                    id="amount"
                    type="number"
                    name="amount"
                    value={data.amount}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('amount', e.target.value)}
                    required
                />
                <InputError message={errors.amount} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="practice_area" value="Practice Area" />
                <TextInput
                    id="practice_area"
                    type="text"
                    name="practice_area"
                    value={data.practice_area}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('practice_area', e.target.value)}
                    required
                />
                <InputError message={errors.practice_area} className="mt-2" />
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

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {caseResult ? 'Update Case Result' : 'Create Case Result'}
                </PrimaryButton>
            </div>
        </form>
    );
}
