import React, { useCallback, useImperativeHandle, useRef, forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = forwardRef(({ value, onChange }, ref) => {
    const editorRef = useRef();

    useImperativeHandle(ref, () => ({
        getEditor: () => editorRef.current?.getEditor(),
    }));

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ];

    return (
        <div className="quill-wrapper">
            <ReactQuill
                ref={el => {
                    editorRef.current = el;
                }}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className="bg-white"
            />
        </div>
    );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
