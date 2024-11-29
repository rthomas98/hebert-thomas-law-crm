import { useState, useEffect, Fragment } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import { 
    PhotoIcon, 
    TrashIcon,
    ArrowUpTrayIcon,
    CheckCircleIcon,
    PencilIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

export default function MediaLibrary({ onSelect, multiple = false }) {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [editingImage, setEditingImage] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        try {
            const response = await axios.get(route('admin.media.index'));
            setImages(response.data.media);
        } catch (error) {
            console.error('Error loading images:', error);
        }
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('images[]', file);
        });

        try {
            const response = await axios.post(route('admin.media.store'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progress) => {
                    setUploadProgress(Math.round((progress.loaded * 100) / progress.total));
                },
            });
            await loadImages();
            setIsUploading(false);
            setUploadProgress(0);
            toast.success('Images uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            setIsUploading(false);
            setUploadProgress(0);
            toast.error('Failed to upload images');
        }
    };

    const handleImageSelect = (image) => {
        if (!multiple) {
            onSelect(image);
            return;
        }

        const newSelection = selectedImages.includes(image.id)
            ? selectedImages.filter(id => id !== image.id)
            : [...selectedImages, image.id];
        
        setSelectedImages(newSelection);
    };

    const handleConfirmSelection = () => {
        const selectedMediaItems = images.filter(image => selectedImages.includes(image.id));
        onSelect(selectedMediaItems);
    };

    const handleDelete = async (imageId) => {
        if (!confirm('Are you sure you want to delete this file?')) {
            return;
        }

        try {
            await axios.delete(route('admin.media.destroy', imageId));
            await loadImages();
            toast.success('File deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete file');
        }
    };

    const handleEditImage = (image) => {
        setEditingImage(image);
        setIsEditModalOpen(true);
    };

    const handleUpdateMetadata = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        axios.post(route('admin.media.update', editingImage.id), formData, {
            preserveState: true,
            preserveScroll: true,
        })
        .then(() => {
            loadImages();
            setIsEditModalOpen(false);
            setEditingImage(null);
            toast.success('Image metadata updated successfully');
        })
        .catch((error) => {
            console.error('Error updating image metadata:', error);
        });
    };

    return (
        <div className="space-y-4">
            {/* Upload Section */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                        <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                        Upload Images
                        <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                    </label>
                    {multiple && selectedImages.length > 0 && (
                        <button
                            onClick={handleConfirmSelection}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            Confirm Selection ({selectedImages.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                Uploading
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-indigo-600">
                                {uploadProgress}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                        <div
                            style={{ width: `${uploadProgress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300"
                        />
                    </div>
                </div>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={`relative group ${
                            selectedImages.includes(image.id) ? 'ring-2 ring-indigo-600' : ''
                        }`}
                    >
                        <img
                            src={image.thumbnail_url}
                            alt={image.alt_text || image.original_name}
                            className="w-full h-40 object-cover rounded-lg cursor-pointer"
                            onClick={() => handleImageSelect(image)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                            <button
                                onClick={() => handleEditImage(image)}
                                className="p-1.5 bg-white rounded-full text-gray-700 hover:text-indigo-600"
                            >
                                <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(image.id)}
                                className="p-1.5 bg-white rounded-full text-gray-700 hover:text-red-600"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                        {image.title && (
                            <div className="mt-1 text-sm text-gray-600 truncate">
                                {image.title}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            <Transition appear show={isEditModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={() => setIsEditModalOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                                >
                                    Edit Image Metadata
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </Dialog.Title>

                                {editingImage && (
                                    <form onSubmit={handleUpdateMetadata} className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                defaultValue={editingImage.title}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Alt Text
                                            </label>
                                            <input
                                                type="text"
                                                name="alt_text"
                                                defaultValue={editingImage.alt_text}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Caption
                                            </label>
                                            <textarea
                                                name="caption"
                                                defaultValue={editingImage.caption}
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
