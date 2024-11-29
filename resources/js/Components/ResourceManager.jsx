import { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { XMarkIcon } from "@heroicons/react/24/outline";

function SortableResource({ id, title, url, onRemove }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center space-x-2 p-2 bg-white border rounded-md shadow-sm"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-move flex-1 flex items-center space-x-2"
            >
                <span className="text-sm font-medium">{title}</span>
                <span className="text-sm text-gray-500">({url})</span>
            </div>
            <button
                type="button"
                onClick={() => onRemove(id)}
                className="p-1 text-red-600 hover:text-red-800"
            >
                <XMarkIcon className="h-4 w-4" />
            </button>
        </div>
    );
}

export default function ResourceManager({ resources = [], onChange, error }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = resources.findIndex((item) => item.id === active.id);
            const newIndex = resources.findIndex((item) => item.id === over.id);

            onChange(arrayMove(resources, oldIndex, newIndex));
            toast.success('Resource order updated');
        }
    };

    const addResource = () => {
        if (title && url) {
            onChange([
                ...resources,
                {
                    id: Date.now().toString(),
                    title,
                    url,
                },
            ]);
            setTitle("");
            setUrl("");
            toast.success('Resource added successfully');
        }
    };

    const removeResource = (id) => {
        onChange(resources.filter((resource) => resource.id !== id));
        toast.success('Resource removed successfully');
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <InputLabel htmlFor="resource-title" value="Title" />
                    <TextInput
                        id="resource-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="resource-url" value="URL" />
                    <TextInput
                        id="resource-url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 block w-full"
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={addResource}
                disabled={!title || !url}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                Add Resource
            </button>

            {error && <InputError message={error} className="mt-2" />}

            <div className="mt-4 space-y-2">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={resources.map((r) => r.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {resources.map((resource) => (
                            <SortableResource
                                key={resource.id}
                                id={resource.id}
                                title={resource.title}
                                url={resource.url}
                                onRemove={removeResource}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}
