import { useState, useEffect } from 'react';
import { formatCurrency } from '@/utils/format';

export default function ContentPreview({ type, data }) {
    const [previewData, setPreviewData] = useState(data);

    useEffect(() => {
        setPreviewData(data);
    }, [data]);

    const renderLegalnarPreview = () => (
        <div className="space-y-4">
            {previewData.featured_image && (
                <img
                    src={typeof previewData.featured_image === 'string' 
                        ? previewData.featured_image 
                        : URL.createObjectURL(previewData.featured_image)}
                    alt={previewData.title}
                    className="w-full h-48 object-cover rounded-lg"
                />
            )}
            <h2 className="text-xl font-semibold">{previewData.title}</h2>
            {previewData.scheduled_time && (
                <p className="text-gray-600">
                    {new Date(previewData.scheduled_time).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                    })}
                </p>
            )}
            {previewData.duration && (
                <p className="text-gray-600">
                    Duration: {Math.floor(previewData.duration / 60)}h {previewData.duration % 60}m
                </p>
            )}
            {previewData.price && (
                <p className="text-lg font-semibold">{formatCurrency(previewData.price)}</p>
            )}
            <div className="prose prose-sm max-w-none" 
                dangerouslySetInnerHTML={{ __html: previewData.description }} 
            />
        </div>
    );

    const renderInsightPreview = () => (
        <div className="space-y-4">
            {previewData.featured_image && (
                <img
                    src={typeof previewData.featured_image === 'string' 
                        ? previewData.featured_image 
                        : URL.createObjectURL(previewData.featured_image)}
                    alt={previewData.title}
                    className="w-full h-48 object-cover rounded-lg"
                />
            )}
            <h2 className="text-xl font-semibold">{previewData.title}</h2>
            {previewData.category && (
                <p className="text-sm text-indigo-600">{previewData.category}</p>
            )}
            {previewData.published_at && (
                <p className="text-gray-600">
                    {new Date(previewData.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
            )}
            <div className="prose prose-sm max-w-none" 
                dangerouslySetInnerHTML={{ __html: previewData.content }} 
            />
        </div>
    );

    const renderCaseResultPreview = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">{previewData.title}</h2>
            {previewData.practice_area && (
                <p className="text-sm text-indigo-600">{previewData.practice_area}</p>
            )}
            {previewData.amount && (
                <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(previewData.amount)}
                </p>
            )}
            <div className="prose prose-sm max-w-none" 
                dangerouslySetInnerHTML={{ __html: previewData.description }} 
            />
        </div>
    );

    const renderResourcePreview = () => (
        <div className="space-y-4">
            {previewData.featured_image && (
                <img
                    src={typeof previewData.featured_image === 'string' 
                        ? previewData.featured_image 
                        : URL.createObjectURL(previewData.featured_image)}
                    alt={previewData.title}
                    className="w-full h-48 object-cover rounded-lg"
                />
            )}
            <h2 className="text-xl font-semibold">{previewData.title}</h2>
            {previewData.category && (
                <p className="text-sm text-indigo-600">{previewData.category}</p>
            )}
            <div className="prose prose-sm max-w-none" 
                dangerouslySetInnerHTML={{ __html: previewData.content }} 
            />
            {previewData.download_url && (
                <div className="mt-4">
                    <a
                        href={previewData.download_url}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Resource
                    </a>
                </div>
            )}
        </div>
    );

    const previewMap = {
        legalnar: renderLegalnarPreview,
        insight: renderInsightPreview,
        caseResult: renderCaseResultPreview,
        resource: renderResourcePreview,
    };

    const renderPreview = previewMap[type] || (() => null);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Content Preview</h3>
            <div className="preview-container">
                {renderPreview()}
            </div>
        </div>
    );
}
