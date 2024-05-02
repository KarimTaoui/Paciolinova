import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment';
import person from '../assets/person.png';
import logo from '../assets/logo.png';

/**
 * A chat message component that displays a message with a timestamp and an icon.
 *
 * @param {Object} props - The properties for the component.
 */
const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false } = props.message;

  return (
    <div key={id} className={`${ai && 'bg-sky-100'} flex-row-reverse message px-10`}>
      <div className="message__wrapper">
        <ReactMarkdown
          className={'message__markdown text-left'}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            code({ /*inline, className, children*/ }) { // Commented out unused variables
              // Render code blocks as plain text
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
