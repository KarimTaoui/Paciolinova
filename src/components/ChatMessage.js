import React from 'react';
import moment from 'moment';
import person from '../assets/person.png';
import logo from '../assets/logo.png';

const ChatMessage = (props) => {
  const { id, createdAt, ai = false } = props.message; // Remove unused variable `text`

  return (
    <div key={id} className={`${ai && 'bg-sky-100'} flex-row-reverse message px-10`}>
      <div className="message__wrapper">
        <span>Bonjour! Comment puis-je vous aider aujourd&apos;hui ?</span>
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
