import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import ReactMarkdown from 'https://cdn.jsdelivr.net/npm/react-markdown@10.1.0/+esm'

// Define available commands and their markdown responses
const COMMANDS = {
    "/about": "**About Me**\n\nI'm Atharv Vyas, a Full Stack Developer specializing in AI integration with expertise in building scalable web applications. My passion lies in creating innovative solutions that leverage cutting-edge technologies like Generative AI to solve real-world problems. \n\n[`Download Resume`](https://drive.google.com/file/d/10TRp8RkbQF762a2Bpy1fvrQgcGV3uWO6/view?usp=sharing)",

    "/education": "### 🎓 Education\n**B.E in Artificial Intelligence & Data Science with Honors in Cyber Security**\n\nSavitribai Phule Pune University (2021–2025)\nCGPA: 8.75\n\n**Certifications**:\n- Machine Learning Specialization (Stanford, Coursera)\n- ChatGPT Prompt Engineering for Developers (deeplearning.ai)\n- Complete Generative AI Course with Langchain & Huggingface (Udemy)",

    "/experience": "### 💼 Work Experience\n\n**Full Stack Developer @ Altrd** (Sept 2024 – Present)\n\n- Collaborated with major clients including Boat, Dabur, and Flipkart\n\n- Developed AI-enabled solutions for operational efficiency\n\n- Managed live marketing campaigns with cutting-edge technology\n\n**Full Stack Developer @ Pooka Labs** (Apr – Jul 2024)\n\n- Single-handedly led projects from design to deployment\n\n- Managed client relationships while maintaining 100% satisfaction\n\n- Gained expertise in multiple aspects of software development and SEO\n\n**Web Developer Intern @ Janvry Studio** (Dec 2023 – Feb 2024)\n\n- Developed custom portfolio landing page with complex animations\n\n- Increased client engagement by 40% through interactive design\n\n**Frontend Developer @ Zigy Prints** (Sep – Nov 2023)\n\n- Built 3D web components using Three.js\n\n- Managed backend-frontend integration and timeline coordination\n\n- Enhanced e-commerce UX with modern technologies",

    "/projects": "### 🛠️ Projects\n\n**[Tiger Safari Trails](https://tigersafaritrails.in/)**\n- Full-stack safari booking platform with reservation system\n- Admin panel managing 7+ categories with SEO optimization\n- Tech: Next.js, Firebase, Tailwind, Shadcn-UI, Otpless\n\n**[#AskCava D2C Chatbot](https://cavaathleisure.com/)**\n- AI-powered conversational recommendation bot for D2C websites\n- Personalized shopping experience based on customer preferences\n- Tech: Python, Langchain, OpenAI-GPT, Shopify\n\n**[Flipkart Minutes Of The Meeting](https://www.minutesofthemeeting.ai/meetings)**\n- AI Notetaker application with meeting recording and summarization\n- Built with reward mechanism for Flipkart collaboration\n- Tech: Next.js, Python\n\n**[Vi-IMC 2024](https://myvi-events.in/)**\n- AI tool for MSME owners to generate promotional jingles\n- Presented at VI booth during IMC 2024\n- Tech: Next.js, TypeScript, Python\n\n**[Personal Project Management System](https://personal-project-manager-one.vercel.app/)**\n- Dashboard and calendar to track projects and tasks\n- Tech: Next.js, Drizzle, TypeScript, Shadcn, PostgreSQL",

    "/skills": "### 🧠 Technical Skills\n\n**Languages**:\n- Python, TypeScript, JavaScript\n\n**Frontend**:\n- React.js, Next.js, Vue.js\n- Three.js, GSAP, Bootstrap, Chakra UI, Tailwind CSS\n\n**Backend**:\n- Next.js, Flask, PHP, Google Cloud, Firebase\n- REST APIs, Database Management\n\n**AI & ML Libraries**:\n- Langchain, Huggingface, OpenAI GPT\n\n**Tools**:\n- VS Code, Docker, Git/GitHub, Figma, BitBucket\n- Jira, Postman, Linux, Jupyter Notebook\n\n**Course Work**:\n- Deep Learning, Data Science, Probability & Statistics\n- Artificial Intelligence, Machine Learning\n- Quantum Artificial Intelligence",

    "/roles": "### 🎯 Leadership Roles\n- Club Advisor @ ACM Student Chapter DYPIEMR (2024-2025)\n- Technical Head @ ACM Student Chapter DYPIEMR (2023-2024)\n- Mentor @ Entrepreneurship Development Cell DYPIEMR (2023-2024)\n- Web Developer @ TEDX DYPEC, Akurdi (2023-2024)\n- Web Development Head @ Novus Neurons (2023-2024)\n- Jt. Web Development Head @ CSI DYPIEMR (2022-2023)",

    "/achievements": "### 🏆 Competitions & Hackathons\n\n**WorldQuant Championship**\n- Achieved bronze level with global rank 257 out of thousands\n\n**StableCode 24-hours Hackathon**\n- Integrated Stability AI's StableCode with voice commands\n- Secured 9th rank among hundreds of competing teams\n\n**OpenAI Whisper, GPT3, Codex Project**\n- Supertrained a GPT-2 model with Codex to enhance coding capabilities\n- Demonstrated expertise in language model fine-tuning and cross-model integration",

    "/contact": "### 📬 Contact Information\n- **Email**: [vyasatharv889@gmail.com](mailto:vyasatharv889@gmail.com)\n- **Phone**: +91-9405525889\n- **GitHub**: [github.com/1447bits](https://github.com/1447bits)\n- **LinkedIn**: [linkedin.com/in/mstatharv](https://linkedin.com/in/mstatharv)\n- **Portfolio**: [1447bits.github.io](https://1447bits.github.io/)",

    "/links": "### 🔗 Project Links\n- **Portfolio**: [1447bits.github.io](https://1447bits.github.io/)\n- **Tiger Safari Trails**: [tigersafaritrails.in](https://tigersafaritrails.in/)\n- **Cava D2C Chatbot**: [cavaathleisure.com](https://cavaathleisure.com/)\n- **Flipkart MOM**: [minutesofthemeeting.ai](https://www.minutesofthemeeting.ai/meetings)\n- **Vi-IMC 2024**: [myvi-events.in](https://myvi-events.in/)\n- **Personal Project Manager**: [ppm-vercel.app](https://personal-project-manager-one.vercel.app/)\n- **TipeIt**: [1447bits.github.io/typeit](https://1447bits.github.io/typeit/)",

    "/tech": "### 💻 Tech Stack I Love\n- **Frontend**: Next.js, React, Svelte.js, Vue.js, Three.js for interactive 3D experiences\n- **Backend**: Firebase, Next.js API routes, Python Flask\n- **AI Integration**: LangChain, Huggingface Transformers, OpenAI APIs\n- **UI Libraries**: Tailwind CSS, Shadcn UI, GSAP for animations\n- **State Management**: Zustand, Redux\n- **Authentication**: Firebase Auth, NextAuth, Otpless\n\nI'm constantly exploring new technologies to stay at the cutting edge!",

    "/help": "### 🧭 Available Commands\n\n- `/about` - Quick introduction\n- `/education` - Academic background\n- `/experience` - Professional journey\n- `/projects` - Portfolio highlights\n- `/skills` - Technical expertise\n- `/roles` - Leadership positions\n- `/achievements` - Competitions & awards\n- `/contact` - Get in touch\n- `/links` - Project URLs\n- `/tech` - Favorite technologies\n- `/hello` - Welcome message\n- `/clear` - Clear terminal",

    "/hello": "👋 Welcome to my interactive portfolio terminal! I'm Atharv, a Full Stack Developer specialized in AI integration. Type `/help` to see available commands and explore my work.",

    "/clear": ""
};

const TerminalComponent = ({ containerStyle }) => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([{
        type: 'response',
        content: `Hello! Hope you are having a great time ^^\n\nThis is Atharv's Terminal, Try **/help** command to know more :)`
    }]);
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
        if (messages.length > 1 || suggestions.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, currentTypingText, suggestions]);

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

            e.preventDefault();


            // run selected command on enter
            if (suggestions.length > 0) {

                // special commands
                if (suggestions[activeIndex] === "/clear") {
                    setMessages([])
                    setInputValue('');
                    return
                }

                setInputValue(suggestions[activeIndex])
                // Add user input as a message
                setMessages(prev => [...prev, { type: 'command', content: suggestions[activeIndex] }]);

                const commandResponse = COMMANDS[suggestions[activeIndex]];
                setFullResponseText(commandResponse);
                setCurrentTypingText('');
                setIsTyping(true);

            } else {

                // special commands
                if (inputValue === "/clear") {
                    setMessages([])
                    setInputValue('');
                    return
                }

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

            }

            // Clear input field
            setInputValue('');
        }
    };
    function focusInput() {
        inputRef.current.focus()
    }

    return (
        <div id='TerminalContainer' className={`flex flex-col w-full ${containerStyle}`} onClick={focusInput}>
            <div className="flex-grow rounded-t-lg  shadow-md">
                <div className="flex flex-col space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg text-gray-100 gap-5 flex flex-col`}>
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
                    <Terminal size={20} className=" mr-2" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-grow w-full outline-none border-none "
                        placeholder="Type a command starting with '/'"
                    />
                </div>

                {suggestions.length > 0 && (
                    <div className="mt-1 flex gap-4 px-4 rounded-lg shadow-lg z-10 max-h-40 flex-wrap">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={suggestion}
                                className={`cursor-pointer hover: ${index === activeIndex ? 'bg-gray-600  px-2 rounded-xs' : ''}`}
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