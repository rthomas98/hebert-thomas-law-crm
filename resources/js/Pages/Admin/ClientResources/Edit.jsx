import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Tab } from '@headlessui/react';
import Form from './Form';
import MediaLibrary from '@/Components/Admin/MediaLibrary';
import SEOTools from '@/Components/Admin/SEOTools';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Edit({ auth, resource }) {
    const tabs = [
        { name: 'Basic Info', content: <Form resource={resource} /> },
        { name: 'Media Library', content: <MediaLibrary selectedMedia={resource.media || []} /> },
        { name: 'SEO Tools', content: <SEOTools initialData={resource.seo_data || {}} /> }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Client Resource</h2>}
        >
            <Head title="Edit Client Resource" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <Tab.Group>
                                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                                    {tabs.map((tab) => (
                                        <Tab
                                            key={tab.name}
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                                    selected
                                                        ? 'bg-white text-blue-700 shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                        >
                                            {tab.name}
                                        </Tab>
                                    ))}
                                </Tab.List>
                                <Tab.Panels className="mt-6">
                                    {tabs.map((tab, idx) => (
                                        <Tab.Panel key={idx} className="rounded-xl bg-white p-3">
                                            {tab.content}
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
