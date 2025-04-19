import { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Instagram } from 'lucide-react';


function About() {

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const socialIcons = [
    {
      icon: <Phone size={20} />,
      title: "Call",
      href: "tel:+91-9405525889"
    },
    {
      icon: <Mail size={20} />,
      title: "Mail",
      href: "mailto:vyasatharv889@gmail.com"
    },
    {
      icon: <Github size={20} />,
      title: "Github",
      href: "https://github.com/1447bits/"
    },
    {
      icon: <Linkedin size={20} />,
      title: "Linkedin",
      href: "https://www.linkedin.com/in/mstatharv/"
    },
    {
      icon: <Instagram size={20} />,
      title: "Instagram",
      href: "https://www.instagram.com/atharv.1447/"
    }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id.replace('contactForm', '').toLowerCase()]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { name, contact, message } = formData;

    if (name.length === 0 || contact.length === 0 || message.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const encodedMessage = encodeUrl(`Hello!,${name} This side,${message}, contact me at : @${contact}`);
    const waMeLink = `https://wa.me/+919405525889?text=${encodedMessage}`;
    window.open(waMeLink, '_blank');
  };

  const encodeUrl = (text) => {
    return encodeURIComponent(text)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')
      .replace(/%20/g, '+');
  };

  return (
    <div className='min-h-[500px] gap-10 flex flex-col justify-center items-center'>

      <div className="flex flex-col text-gray-100 max-w-[90vw] w-lg p-6">
        <div className="w-full mx-auto">
          <form className="flex flex-col space-y-4 mb-8">
            <input
              id="contactFormName"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="px-4 py-2 border-1 border-gray-400 rounded-md bg-transparent focus-within:bg-transparent focus:bg-transparent autofill:bg-transparent"
            />
            <input
              id="contactFormContact"
              type="text"
              placeholder="Contact Email"
              value={formData.contact}
              onChange={handleInputChange}
              className="px-4 py-2 border-1 border-gray-400 rounded-md bg-transparent focus-within:bg-transparent focus:bg-transparent autofill:bg-transparent"
            />
            <textarea
              id="contactFormMessage"
              placeholder="Message |"
              value={formData.message}
              onChange={handleInputChange}
              className="px-4 py-2 h-32 border-1 border-gray-400 rounded-md bg-transparent focus-within:bg-transparent focus:bg-transparent autofill:bg-transparent resize-none"
            />
            <button
              onClick={handleFormSubmit}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md hover:transition duration-300"
            >
              Send
            </button>
          </form>

          <div className="flex justify-center space-x-6">
            {socialIcons.map((icon, index) => (
              <a
                key={`socialIcon-${index}`}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                title={icon.title}
              >
                {icon.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl border-t border-gray-700 my-12"></div>

      <p>Alternatively Drop your Query at <br /> <span className='underline underline-offset-4 italic'>vyasatharv889@gmail.com</span></p>
    </div>
  )
}

export default About