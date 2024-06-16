import React, { useState, useMemo, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import { MdThumbUp, MdThumbDown, MdVolumeUp, MdContentCopy } from 'react-icons/md';
import person from '../assets/person.png';
import logo from '../assets/logo.png';
import notificationSound from '../assets/notification.mp3';

const ChatMessage = ({ message }) => {
  const { id, createdAt, text, ai = false } = message;
  const [feedback, setFeedback] = useState({ likes: 0, dislikes: 0, liked: false, disliked: false });
  const [voiceRead, setVoiceRead] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ai) {
      const audio = new Audio(notificationSound);
      audio.play();
    }
  }, [ai]);

  const handleLike = () => {
    setFeedback((prev) => {
      if (!prev.liked) {
        return {
          likes: prev.likes + 1,
          dislikes: prev.disliked ? prev.dislikes - 1 : prev.dislikes,
          liked: true,
          disliked: false,
        };
      }
      return { ...prev, likes: prev.likes - 1, liked: false };
    });
  };

  const handleDislike = () => {
    setFeedback((prev) => {
      if (!prev.disliked) {
        return {
          dislikes: prev.dislikes + 1,
          likes: prev.liked ? prev.likes - 1 : prev.likes,
          disliked: true,
          liked: false,
        };
      }
      return { ...prev, dislikes: prev.dislikes - 1, disliked: false };
    });
  };

  const handleReadAloud = () => {
    const speechText = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speechText);
    setVoiceRead(true);
    setTimeout(() => setVoiceRead(false), 2000);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const avatar = useMemo(() => {
    return (
      <div className="avatar">
        <div className="w-8 border rounded-full">
          {ai ? <img width="30" src={logo} alt="Logo" /> : <img src={person} alt="profile pic" />}
        </div>
      </div>
    );
  }, [ai]);

  return (
    <div key={id} className={`${ai && 'bg-sky-100'} flex-row-reverse message px-10`}>
      <div className="message__wrapper">
        <ReactMarkdown
          className="message__markdown text-left"
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            code() {
              return (
                <span>
                  Bonjour! Comment puis-je vous aider aujourd&apos;hui ?
                </span>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>

        <div className="text-left message__createdAt">{moment(createdAt).calendar()}</div>

        {ai && (
          <div className="message__feedback mt-2">
            <button
              className={`message__feedback-button ${feedback.liked ? 'clicked' : ''}`}
              onClick={handleLike}
              aria-label="Like"
            >
              <MdThumbUp className="message__feedback-icon" size={20} />
            </button>
            <button
              className={`message__feedback-button ${feedback.disliked ? 'disliked' : ''}`}
              onClick={handleDislike}
              aria-label="Dislike"
            >
              <MdThumbDown className="message__feedback-icon" size={20} />
            </button>
            <button
              className={`message__feedback-button voice-read ${voiceRead ? 'clicked' : ''}`}
              onClick={handleReadAloud}
              aria-label="Read aloud"
            >
              <MdVolumeUp className="message__feedback-icon" size={20} />
            </button>
            <button
              className={`message__feedback-button copy ${copied ? 'clicked' : ''}`}
              onClick={handleCopyToClipboard}
              aria-label="Copy to clipboard"
            >
              <MdContentCopy className="message__feedback-icon" size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="message__pic">
        {avatar}
      </div>
    </div>
  );
};

export default ChatMessage;
