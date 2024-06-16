import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import { MdThumbUp, MdThumbDown, MdVolumeUp, MdContentCopy } from 'react-icons/md';
import person from '../assets/person.png';
import logo from '../assets/logo.png';

const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false } = props.message;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [voiceRead, setVoiceRead] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    } else {
      setDislikes(dislikes - 1);
      setDisliked(false);
    }
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
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    <div key={id} className={`${ai && 'bg-sky-100'} flex-row-reverse message px-10`}>
      <div className="message__wrapper">
        <ReactMarkdown
          className={'message__markdown text-left'}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            code({ node, inline, className, children, ...props }) {
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
              className={`message__feedback-button ${liked ? 'clicked' : ''}`}
              onClick={handleLike}
            >
              <MdThumbUp className="message__feedback-icon" size={20} />
            </button>
            <button
              className={`message__feedback-button ${disliked ? 'disliked' : ''}`}
              onClick={handleDislike}
            >
              <MdThumbDown className="message__feedback-icon" size={20} />
            </button>
            <button
              className={`message__feedback-button voice-read ${voiceRead ? 'clicked' : ''}`}
              onClick={handleReadAloud}
            >
              <MdVolumeUp className="message__feedback-icon" size={20} />
            </button>
            <button
              className={`message__feedback-button copy ${copied ? 'clicked' : ''}`}
              onClick={handleCopyToClipboard}
            >
              <MdContentCopy className="message__feedback-icon" size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="message__pic">
        <div className="avatar">
          <div className="w-8 border rounded-full">
            {ai ? <img width="30" src={logo} alt="Logo" /> : <img src={person} alt="profile pic" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
