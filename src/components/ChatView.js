// ChatView.js

import React, { useState, useRef, useEffect, useContext } from 'react';
import ChatMessage from './ChatMessage';
import { ChatContext } from '../context/chatContext';
import { MdSend, MdLightbulbOutline } from 'react-icons/md';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Modal from './Modal';
import Setting from './Setting';
import PromptPerfect from './PromptPerfect';
import 'moment/locale/fr'; // Import the French localization module

const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, addMessage] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPromptOpen, setModalPromptOpen] = useState(false);
  const [prompt, setPrompt] = useState(''); // Define prompt state
  const [promptSuggestions, setPromptSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateMessage = (newValue, ai = false) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
    };

    addMessage(newMsg);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) return;

    const cleanPrompt = formValue.trim();
    setFormValue('');
    updateMessage(cleanPrompt, false);

    setLoading(true);

    try {
      const response = await fetch('https://karimou-74f1922470da.herokuapp.com/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: cleanPrompt }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData = await response.json();
      const botResponse = responseData.response[0].text;

      updateMessage(botResponse, true);
    } catch (error) {
      console.error('Error fetching data:', error);
      updateMessage("Sorry, there was an error processing your request.", true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e);
      inputRef.current.style.height = 'auto';
    }
  };

  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  const fetchPromptSuggestions = () => {
    const suggestions = [
      "What are the latest trends in technology?",
      "Can you tell me a fun fact about space?",
      "How can I improve my productivity?"
    ];
    setPromptSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const handleLightbulbClick = () => {
    fetchPromptSuggestions();
  };

  const handleSuggestionSelect = (suggestion) => {
    setFormValue(suggestion);
    setShowSuggestions(false);
  };

  const handleUseClicked = () => {
    setFormValue(prompt); // Update formValue with prompt value
    setModalPromptOpen(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
  }, [formValue]);

  return (
    <div className="chatview">
      <main className="chatview__chatarea">
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            <ChatMessage message={message} />
            {index === messages.length - 1 && loading && (
              <div className="chatview__typing-indicator">
                <div className="typing-circle"></div>
                <span className="typing-text">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
        <span ref={messagesEndRef}></span>
      </main>
      <form className="form" onSubmit={sendMessage}>
        <div className="flex items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            rows={1}
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <div className="flex items-center">
            <button type="submit" className="chatview__btn-send" disabled={!formValue || loading}>
              <MdSend size={30} />
            </button>
            <button
              id="tooltip"
              type="button"
              className="chatview__btn-send"
              disabled={!formValue}
              onClick={handleLightbulbClick}
            >
              <MdLightbulbOutline size={30} />
            </button>
          </div>
        </div>
        <ReactTooltip
          anchorId="tooltip"
          place="top"
          variant="dark"
          content="Help me with this prompt!"
        />
        {showSuggestions && (
          <PromptSuggestions suggestions={promptSuggestions} onSelect={handleSuggestionSelect} />
        )}
      </form>
      <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>
      <Modal title="Prompt Perfect" modalOpen={modalPromptOpen} setModalOpen={setModalPromptOpen}>
        <PromptPerfect
          prompt={prompt}
          onChange={setPrompt}
          onCancelClicked={() => setModalPromptOpen(false)}
          onUseClicked={handleUseClicked}
        />
      </Modal>
    </div>
  );
};

const PromptSuggestions = ({ suggestions, onSelect }) => {
  return (
    <div className="prompt-suggestions">
      {suggestions.map((suggestion, index) => (
        <div key={index} onClick={() => onSelect(suggestion)} className="suggestion">
          {suggestion}
        </div>
      ))}
    </div>
  );
};

export default ChatView;
