import { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { router } from '@inertiajs/react';

const TINYMCE_API_KEY = '71njpraqknqbbkeet83sybnwnco7cr3fib8ptq7hdckanuct';

// Custom templates for common content patterns
const templates = [
    {
        title: 'Call to Action',
        description: 'Add a call to action button',
        content: `
            <div class="my-8 text-center">
                <h3 class="text-2xl font-bold mb-4">{$title}</h3>
                <p class="mb-4">{$description}</p>
                <a href="{$link}" class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    {$button_text}
                </a>
            </div>
        `
    },
    {
        title: 'Featured Quote',
        description: 'Add a highlighted quote section',
        content: `
            <blockquote class="my-8 p-6 bg-gray-50 border-l-4 border-blue-600">
                <p class="text-xl italic mb-4">{$quote}</p>
                <footer class="text-sm">
                    <cite>&mdash; {$author}</cite>
                </footer>
            </blockquote>
        `
    },
    {
        title: 'Two Column Layout',
        description: 'Add a two-column content section',
        content: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div class="col-span-1">
                    <h3 class="text-xl font-bold mb-4">{$left_title}</h3>
                    <p>{$left_content}</p>
                </div>
                <div class="col-span-1">
                    <h3 class="text-xl font-bold mb-4">{$right_title}</h3>
                    <p>{$right_content}</p>
                </div>
            </div>
        `
    }
];

// Custom styles that match your website's design
const customStyles = `
    body {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #1f2937;
        max-width: 65ch;
        margin: 0 auto;
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
        line-height: 1.25;
        margin-bottom: 0.5em;
        color: #111827;
    }
    h1 { font-size: 2.5em; }
    h2 { font-size: 2em; }
    h3 { font-size: 1.75em; }
    h4 { font-size: 1.5em; }
    p { margin-bottom: 1.25em; }
    a { 
        color: #2563eb;
        text-decoration: underline;
    }
    a:hover {
        color: #1d4ed8;
    }
    blockquote {
        border-left: 4px solid #e5e7eb;
        margin: 1.5em 0;
        padding-left: 1em;
        font-style: italic;
    }
    code {
        background: #f3f4f6;
        padding: 0.2em 0.4em;
        border-radius: 0.25em;
        font-size: 0.875em;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5em 0;
    }
    th, td {
        border: 1px solid #e5e7eb;
        padding: 0.75em;
        text-align: left;
    }
    th {
        background: #f9fafb;
        font-weight: 600;
    }
    img {
        max-width: 100%;
        height: auto;
        border-radius: 0.375em;
    }
    ul, ol {
        margin: 1.25em 0;
        padding-left: 1.25em;
    }
    li { margin-bottom: 0.5em; }
`;

export default function RichTextEditor({ 
    value, 
    onChange, 
    height = 500,
    customToolbar,
    customPlugins,
    customOptions = {},
    placeholder = 'Start writing...'
}) {
    const editorRef = useRef(null);

    // Default plugins with advanced features
    const defaultPlugins = [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
        'paste', 'pagebreak', 'quickbars', 'nonbreaking', 'emoticons',
        'hr', 'textpattern', 'toc', 'imagetools', 'template', 'codesample'
    ];

    // File picker callback for handling non-image files
    const filePickerCallback = (callback, value, meta) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        
        // Set accepted file types based on the request
        if (meta.filetype === 'image') {
            input.setAttribute('accept', 'image/*');
        } else if (meta.filetype === 'media') {
            input.setAttribute('accept', 'video/*,audio/*');
        } else if (meta.filetype === 'file') {
            input.setAttribute('accept', '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip');
        }

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            try {
                const formData = new FormData();
                formData.append('image', file); // Keep 'image' as the field name for compatibility

                const response = await fetch('/admin/media/upload', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: formData
                });

                if (!response.ok) throw new Error('Upload failed');

                const data = await response.json();
                
                callback(data.url, { 
                    title: file.name,
                    ...(data.thumbnail ? { thumbnail: data.thumbnail } : {})
                });
            } catch (error) {
                console.error('File upload failed:', error);
                // You might want to show a notification here
            }
        };

        input.click();
    };

    return (
        <Editor
            apiKey={TINYMCE_API_KEY}
            onInit={(evt, editor) => editorRef.current = editor}
            value={value}
            onEditorChange={(content) => onChange(content)}
            init={{
                height,
                menubar: true,
                plugins: customPlugins || defaultPlugins,
                toolbar: customToolbar || [
                    'styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify',
                    'bullist numlist outdent indent | link image media codesample table template',
                    'forecolor backcolor removeformat | searchreplace fullscreen code preview | help'
                ],
                style_formats: [
                    { title: 'Headings', items: [
                        { title: 'Heading 1', format: 'h1' },
                        { title: 'Heading 2', format: 'h2' },
                        { title: 'Heading 3', format: 'h3' },
                        { title: 'Heading 4', format: 'h4' }
                    ]},
                    { title: 'Blocks', items: [
                        { title: 'Paragraph', format: 'p' },
                        { title: 'Blockquote', format: 'blockquote' },
                        { title: 'Code Block', format: 'pre' }
                    ]},
                    { title: 'Inline', items: [
                        { title: 'Bold', format: 'bold' },
                        { title: 'Italic', format: 'italic' },
                        { title: 'Underline', format: 'underline' },
                        { title: 'Strikethrough', format: 'strikethrough' },
                        { title: 'Code', format: 'code' }
                    ]}
                ],
                templates,
                content_style: customStyles,
                placeholder,
                branding: false,
                promotion: false,
                skin: 'oxide',
                resize: true,
                convert_urls: true,
                relative_urls: true,
                remove_script_host: true,
                document_base_url: window.location.origin,
                paste_data_images: true,
                automatic_uploads: true,
                file_picker_types: 'file image media',
                file_picker_callback: filePickerCallback,
                images_upload_handler: filePickerCallback,
                quickbars_selection_toolbar: 'bold italic | h2 h3 | blockquote link',
                quickbars_insert_toolbar: 'quickimage quicktable codesample',
                contextmenu: 'link image table spellchecker',
                spellchecker_language: 'en',
                browser_spellcheck: true,
                textpattern_patterns: [
                    { start: '# ', cmd: 'mceInsertContent', value: '<h1>$1</h1>' },
                    { start: '## ', cmd: 'mceInsertContent', value: '<h2>$1</h2>' },
                    { start: '### ', cmd: 'mceInsertContent', value: '<h3>$1</h3>' },
                    { start: '> ', cmd: 'mceInsertContent', value: '<blockquote><p>$1</p></blockquote>' },
                    { start: '1. ', cmd: 'InsertOrderedList' },
                    { start: '* ', cmd: 'InsertUnorderedList' },
                    { start: '- ', cmd: 'InsertUnorderedList' },
                    { start: '```', cmd: 'mceInsertContent', value: '<pre><code>$1</code></pre>' },
                    { start: '---', cmd: 'mceInsertContent', value: '<hr />' }
                ],
                ...customOptions,
                setup: function (editor) {
                    editor.on('init', function (e) {
                        editor.setContent(value || '');
                    });

                    // Add custom keyboard shortcuts
                    editor.addShortcut('meta+shift+1', 'Insert H1', () => editor.execCommand('mceInsertContent', false, '<h1>$1</h1>'));
                    editor.addShortcut('meta+shift+2', 'Insert H2', () => editor.execCommand('mceInsertContent', false, '<h2>$1</h2>'));
                    editor.addShortcut('meta+shift+3', 'Insert H3', () => editor.execCommand('mceInsertContent', false, '<h3>$1</h3>'));
                    editor.addShortcut('meta+shift+q', 'Insert Blockquote', () => editor.execCommand('mceInsertContent', false, '<blockquote>$1</blockquote>'));
                    editor.addShortcut('meta+shift+k', 'Insert Code', () => editor.execCommand('mceInsertContent', false, '<code>$1</code>'));
                }
            }}
        />
    );
}
