import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import person from '../assets/person.png';
import logo from '../assets/logo.png';

const ChatMessage = ({ message }) => {
  const { id, createdAt, text, ai = false } = message;

  return (
    <div key={id} className={`${ai && 'bg-sky-100'} flex-row-reverse message px-10`}>
      <div className="message__wrapper">
        <ReactMarkdown
          className={'message__markdown text-left'}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            code() { // Remove unnecessary destructuring
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
