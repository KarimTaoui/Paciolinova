import React, { useState, useRef, useEffect, useContext } from 'react';
import ChatMessage from './ChatMessage';
import { ChatContext } from '../context/chatContext';
import { MdSend, MdMic, MdLightbulbOutline } from 'react-icons/md';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Modal from './Modal';
import Setting from './Setting';
import PromptPerfect from './PromptPerfect';
import AmortissementForm from './AmortissementForm';
import 'moment/locale/fr';

const ChatView = () => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const suggestionsRef = useRef();
  const [formValue, setFormValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, addMessage] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPromptOpen, setModalPromptOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [promptSuggestions] = useState([
    "Calculer l'amortissement linéaire",
    "Calculer l'amortissement progressif",
    "Calculer l'amortissement dégressif"
 
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [amortissementType, setAmortissementType] = useState(null); // Type d'amortissement sélectionné
  const [settingModalOpen, setSettingModalOpen] = useState(false); // État pour gérer l'ouverture du modal de paramètres

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

  const sendMessage = async (e, inputMessage) => {
    if (e) e.preventDefault();
    const messageToSend = inputMessage || formValue;
    if (!messageToSend) return;

    const cleanPrompt = messageToSend.trim();
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
      setActiveButton(null);
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

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';

    recognition.onstart = () => {
      setIsRecording(true); 
    };

    recognition.onend = () => {
      setIsRecording(false); 
      setActiveButton(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(null, transcript);
    };

    recognition.start();
    setActiveButton('mic');
  };

  const handleSuggestionSelect = (suggestion) => {
    setAmortissementType(suggestion); // Enregistrer le type d'amortissement sélectionné
    setModalOpen(true); // Ouvrir le modal d'amortissement
    setShowSuggestions(false);
  };

  const handleUseClicked = () => {
    setFormValue(prompt);
    setModalPromptOpen(false);
  };

  const handlePromptSuggestions = () => {
    setShowSuggestions(!showSuggestions);
    setActiveButton('lightbulb');
  };

  const handleAmortissementSubmit = (attribut1, attribut2, attribut3) => {
    const message = `${amortissementType.replace("amortissement", "amortissement")} avec ces variables : Coût d'acquisition : ${attribut1} DA , Durée de vie utile : ${attribut2} mois, Valeur résiduelle  : ${attribut3} DA`;
    sendMessage(null, message);
    setModalOpen(false); // Fermer le modal d'amortissement
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveButton(null);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

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
      <form className="form" onSubmit={(e) => sendMessage(e)}>
        <div className="flex items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="chatview__textarea-message"
            rows={1}
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <div className="flex items-center relative">
            <button
              type="submit"
              className={`chatview__btn-send ${activeButton === 'send' ? 'active' : ''}`}
              disabled={!formValue || loading}
              onClick={() => setActiveButton('send')}
            >
              <MdSend size={30} className={activeButton === 'send' ? 'active-icon' : ''} />
            </button>
            <button
              type="button"
              className={`chatview__btn-send ${isRecording ? 'recording' : ''} ${activeButton === 'mic' ? 'active' : ''}`}
              onClick={handleVoiceInput}
            >
              <MdMic size={30} className={activeButton === 'mic' ? 'active-icon' : ''} />
            </button>
            <div className="relative">
              <button
                type="button"
                className={`chatview__btn-send ${activeButton === 'lightbulb' ? 'active' : ''}`}
                onClick={handlePromptSuggestions}
              >
                <MdLightbulbOutline size={30} className={activeButton === 'lightbulb' ? 'active-icon' : ''} />
              </button>
              {showSuggestions && (
                <div className="suggestions-dropdown" ref={suggestionsRef}>
                  {promptSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion"
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <ReactTooltip
          anchorId="tooltip"
          place="top"
          variant="dark"
          content="Help me with this prompt!"
        />
      </form>
      <Modal
        title={amortissementType ? amortissementType.replace("amortissement", "amortissement") : ''}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <AmortissementForm onSubmit={handleAmortissementSubmit} />
      </Modal>
      <Modal
        title="Setting"
        modalOpen={settingModalOpen}
        setModalOpen={setSettingModalOpen}
      >
        <Setting modalOpen={settingModalOpen} setModalOpen={setSettingModalOpen} />
      </Modal>
      <Modal
        title="Prompt Perfect"
        modalOpen={modalPromptOpen}
        setModalPromptOpen={setModalPromptOpen}
      >
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

export default ChatView;
