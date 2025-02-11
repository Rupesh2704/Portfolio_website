import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  isTyping?: boolean;
}

// Knowledge Base
interface KnowledgeEntry {
  patterns: string[];
  responses: string[];
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    patterns: ['tell me about Rupesh', 'your name', 'introduce yourself', 'tell me about yourself', 'rupesh bio', 'personal details'],
    responses: [
      "I am Rupesh Dahibhate, a final-year IT engineering student at VIT with a CGPA of 8.4. I specialize in full-stack development, cloud computing, and AI-driven solutions.",
      "Hello! I'm Rupesh Dahibhate, studying IT engineering at VIT. I'm passionate about full-stack development and cloud computing."
    ]
  },
  {
    patterns: ['education', 'qualification', 'degree', 'college', 'university', 'cgpa', 'gpa', 'grades'],
    responses: [
      "I am pursuing a Bachelor of Engineering in Information Technology at VIT with a CGPA of 8.4.",
      "I'm a B.Tech IT student at Vellore Institute of Technology, maintaining a CGPA of 8.4."
    ]
  },
  {
    patterns: ['skills', 'technical skills', 'programming languages', 'tech stack', 'technologies', 'coding languages'],
    responses: [
      "I have expertise in:\n• Frontend: HTML5, CSS3, JavaScript, ReactJS\n• Backend: Java, Python, Express.js\n• Database: MongoDB\n• Cloud: AWS services",
      "My technical skills include HTML5, JavaScript, CSS3, ReactJS, Java, Python, MongoDB, Express.js, and AWS services."
    ]
  },
  {
    patterns: ['projects', 'work', 'portfolio', 'github', 'past projects', 'show me your work'],
    responses: [
      "I've worked on several exciting projects:\n1. Resume Builder\n2. Hospital Management System\n3. Interactive Kanban Board\n4. YouTube Video Link Manager\n\nYou can check my portfolio for more details!",
      "My key projects include a Resume Builder, Hospital Management System, and more. Would you like specific details about any of these projects?"
    ]
  },
  {
    patterns: ['internship', 'experience', 'work experience', 'past work', 'companies', 'professional experience'],
    responses: [
      "I completed a full-stack development internship at B2WORLD, where I:\n• Worked on web applications\n• Implemented API integrations\n• Developed AI-driven solutions",
      "During my internship at B2WORLD, I gained hands-on experience in full-stack development and AI integration."
    ]
  },
  {
    patterns: ['certification', 'course', 'skills verified', 'aws', 'achievement', 'certificates'],
    responses: [
      "I hold several certifications:\n• AWS Solutions Architect\n• AWS Cloud Practitioner\n• AWS Cloud Foundation\n• Python3\n• Entrepreneurship",
      "I'm certified in AWS (Solutions Architect, Cloud Practitioner, Cloud Foundation), Python3, and Entrepreneurship."
    ]
  },
  {
    patterns: ['future goals', 'aspirations', 'career path', 'where do you see yourself', 'plans', 'future plans'],
    responses: [
      "I see myself as a Software Developer, working on AI-driven solutions, cloud computing, and innovative tech projects.",
      "My career goal is to become a skilled Software Developer, focusing on AI and cloud technologies."
    ]
  },
  {
    patterns: ['dsa', 'coding', 'problem-solving', 'leetcode', 'online coding', 'competitive programming', 'coding practice'],
    responses: [
      "I have completed DSA in Java and actively solve problems on LeetCode. I follow the Apna College DSA sheet for structured learning.",
      "I practice DSA regularly on LeetCode and follow structured learning through the Apna College DSA sheet."
    ]
  },
  {
    patterns: ['aptitude', 'preparation', 'exams', 'study schedule', 'time management', 'study routine'],
    responses: [
      "I dedicate 2 hours daily to aptitude preparation. My study schedule includes DSA, problem-solving, and revision for upcoming exams.",
      "My daily routine includes 2 hours of aptitude practice along with DSA and problem-solving sessions."
    ]
  },
  {
    patterns: ['leadership', 'extracurriculars', 'team management', 'clubs', 'activities', 'extra curricular'],
    responses: [
      "My leadership experiences include:\n• Hosting Scout and Guide events as team leader\n• Flag hosting at school\n• Participating in mountain camps\n• Member of Toastmasters International Club at VIT",
      "I've demonstrated leadership through Scout and Guide events, and I'm an active member of the Toastmasters International Club at VIT."
    ]
  },
  {
    patterns: ['contact', 'reach', 'email', 'social media', 'get in touch'],
    responses: [
      "You can reach me through:\n• Email: rupeshdahibhate2003@gmail.com\n• LinkedIn: rupesh-dahibhate-50b1b7267\n• Or use the Contact form on this website!",
      "Feel free to contact me via email at rupeshdahibhate2003@gmail.com or through LinkedIn."
    ]
  },
  {
    patterns: ['resume', 'cv', 'download resume'],
    responses: [
      "You can download my resume from the homepage by clicking the 'Resume' button. It contains detailed information about my skills and experiences.",
      "My resume is available for download on the homepage. Just click the Resume button!"
    ]
  }
];

const INITIAL_MESSAGE = { 
  text: "Hi! I'm Rupesh's assistant. You can ask me about:\n• Rupesh's education and qualifications\n• Technical skills and expertise\n• Projects and work experience\n• Certifications\n• Contact information\n\nHow can I help you today?", 
  isBot: true 
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleToggleChat = () => {
    if (isOpen) {
      setMessages([INITIAL_MESSAGE]);
      setInputMessage('');
      setIsTyping(false);
    }
    setIsOpen(!isOpen);
  };

  const findBestResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    
    // Find all matching patterns and their scores
    const matches = knowledgeBase.map(entry => {
      const score = entry.patterns.reduce((acc, pattern) => {
        return acc + (lowerMsg.includes(pattern) ? 1 : 0);
      }, 0);
      return { entry, score };
    });

    // Get the entry with the highest score
    const bestMatch = matches.reduce((best, current) => {
      return current.score > best.score ? current : best;
    }, { entry: null, score: 0 });

    if (bestMatch.score > 0 && bestMatch.entry) {
      // Randomly select one of the responses for variety
      const responses = bestMatch.entry.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default response if no match found
    return "I'm not sure about that. Feel free to ask about Rupesh's projects, experience, skills, or education!";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
    
    // Show typing indicator
    setIsTyping(true);

    // Get bot response
    const botResponse = findBestResponse(inputMessage);
    
    // Clear input immediately
    setInputMessage('');

    // Simulate typing and then show response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 2000); // 2 second delay
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      <button
        onClick={handleToggleChat}
        className="bg-primary p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-dark-card rounded-lg shadow-xl border border-primary/20">
          {/* Chat header */}
          <div className="bg-primary p-4 rounded-t-lg">
            <h3 className="text-white font-semibold">Chat with Rupesh's Assistant</h3>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.isBot ? 'text-left' : 'text-right'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-dark text-white'
                      : 'bg-primary text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="mb-4 text-left">
                <div className="inline-block p-3 rounded-lg bg-dark text-white">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-primary/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 rounded-lg bg-dark text-white focus:outline-none focus:ring-1 focus:ring-primary"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                className={`bg-primary p-2 rounded-lg transition-colors ${
                  isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
                }`}
                disabled={isTyping}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 