import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import ReactMarkdown from 'https://cdn.jsdelivr.net/npm/react-markdown@10.1.0/+esm'

// Define available commands and their markdown responses
const COMMANDS = {
    "/about": "**About Us**\n\nWe are a team dedicated to building innovative tools for developers and creators.",
    "/clear": "",
    "/help": "## Available Commands\n\n- `/about` - Learn about us\n- `/help` - Show this help message\n- `/contact` - Contact information\n- `/features` - View our features",
    "/contact": "### Contact Information\n\nEmail: support@example.com\nTwitter: @example\nGitHub: github.com/example",
    "/features": "# Our Features\n\n1. Intuitive command interface\n2. Markdown support\n3. Typing animation\n4. Tab completion\n5. Extensible design"
};

const TerminalComponent = ({ containerStyle }) => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [currentTypingText, setCurrentTypingText] = useState('');
    const [fullResponseText, setFullResponseText] = useState('');

    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // Filter commands based on input
    useEffect(() => {
        if (inputValue.startsWith('/')) {
            const matchingCommands = Object.keys(COMMANDS).filter(
                cmd => cmd.startsWith(inputValue)
            );
            setSuggestions(matchingCommands);
            setActiveIndex(0);
        } else {
            setSuggestions([]);
        }
    }, [inputValue]);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, currentTypingText]);

    // Typing animation effect
    useEffect(() => {
        if (fullResponseText && isTyping) {
            if (currentTypingText.length < fullResponseText.length) {
                const timeout = setTimeout(() => {
                    setCurrentTypingText(fullResponseText.substring(0, currentTypingText.length + 1));
                }, 15);
                return () => clearTimeout(timeout);
            } else {
                setIsTyping(false);
                setMessages(prev => [...prev, { type: 'response', content: fullResponseText }]);
                setCurrentTypingText('');
                setFullResponseText('');
            }
        }
    }, [fullResponseText, currentTypingText, isTyping]);

    const handleKeyDown = (e) => {
        // Handle tab completion
        if (e.key === 'Tab' && suggestions.length > 0) {
            e.preventDefault();
            setInputValue(suggestions[activeIndex]);
        }

        // Handle arrow keys for suggestion navigation
        if (e.key === 'ArrowRight' && suggestions.length > 0) {
            e.preventDefault();
            setActiveIndex((activeIndex + 1) % suggestions.length);
        }

        if (e.key === 'ArrowLeft' && suggestions.length > 0) {
            e.preventDefault();
            setActiveIndex((activeIndex - 1 + suggestions.length) % suggestions.length);
        }

        // Handle enter to submit command
        if (e.key === 'Enter' && inputValue.trim()) {

            // special commands
            if (inputValue === "/clear") {
                setMessages([])
                setInputValue('');
                return
            }

            e.preventDefault();

            // Add user input as a message
            setMessages(prev => [...prev, { type: 'command', content: inputValue }]);

            // Check if input matches a command
            const commandResponse = COMMANDS[inputValue];

            if (commandResponse) {
                setFullResponseText(commandResponse);
                setCurrentTypingText('');
                setIsTyping(true);
            } else if (inputValue.startsWith('/')) {
                setMessages(prev => [...prev, {
                    type: 'response',
                    content: `Command not found: ${inputValue}. Type /help to see available commands.`
                }]);
            }

            // Clear input field
            setInputValue('');
        }
    };
    function focusInput() {
        inputRef.current.focus()
    }

    return (
        <div className={`flex flex-col ${containerStyle}`} onClick={focusInput}>
            <div className="flex-grow rounded-t-lg  shadow-md">
                <div className="flex flex-col space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg text-gray-100`}>
                            {message.type === 'command' ? (
                                <pre className="flex gap-2 font-mono"><Terminal />{message.content}</pre>
                            ) : (
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            )}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="text-gray-200 self-start p-2 rounded-lg">
                            <ReactMarkdown>{currentTypingText}</ReactMarkdown>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="relative rounded-b-lg shadow pb-10-md">
                <div className="flex items-center rounded-lg px-3 py-2">
                    <Terminal size={20} className="text-white mr-2" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow outline-none border-none "
                        placeholder="Type a command starting with '/'"
                        autoFocus
                    />
                </div>

                {suggestions.length > 0 && (
                    <div className="mt-1 flex gap-2 rounded-lg shadow-lg z-10 max-h-40 overflow-auto">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={suggestion}
                                className={`px-4 py-2 cursor-pointer hover: ${index === activeIndex ? 'text-blue-600' : 'text-white'}`}
                                onClick={() => {
                                    setInputValue(suggestion);
                                    inputRef.current.focus();
                                }}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TerminalComponent;