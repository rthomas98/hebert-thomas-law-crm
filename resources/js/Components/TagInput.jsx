import { useState, useRef, useEffect } from 'react';

export default function TagInput({ value = [], onChange, suggestions = [], placeholder = "Add tag..." }) {
    const [input, setInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);
        
        if (inputValue.trim()) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const addTag = (tag) => {
        if (tag.trim() && !value.includes(tag.trim())) {
            onChange([...value, tag.trim()]);
        }
        setInput('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag(input);
        } else if (e.key === 'Backspace' && !input) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div className="relative">
            <div className="min-h-[38px] p-1 flex flex-wrap gap-2 rounded-md border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                {value.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                        >
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 outline-none border-none p-1 min-w-[120px] bg-transparent"
                    placeholder={value.length === 0 ? placeholder : ''}
                />
            </div>
            
            {showSuggestions && filteredSuggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                    {filteredSuggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50"
                            onClick={() => addTag(suggestion)}
                        >
                            <span className="block truncate">{suggestion}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
