import React, { useState, useContext, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdAdd, MdHelpOutline, MdAttachMoney, MdAccountBalance, MdReceipt, MdVideoLibrary } from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import logo from '../assets/logo.png';
import Modal from './Modal';
import Setting from './Setting';
import ReactPlayer from 'react-player';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [, , clearMessages] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [devModalOpen, setDevModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleResize = () => {
    setOpen(window.innerWidth > 720);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const clearChat = () => clearMessages();

  const handleDevModal = () => setDevModalOpen(true);

  const openHelpModal = () => setHelpModalOpen(true);

  const openVideoModal = (url) => {
    setVideoUrl(url);
    setVideoPlaying(true);
    setVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setVideoPlaying(false);
    setVideoModalOpen(false);
    setVideoUrl('');
  };

  const handleVideoEnded = () => {
    setVideoPlaying(false);
  };

  return (
    <section className={`sidebar ${open ? 'w-screen lg:w-96' : 'w-16'} bg-space text-white flex flex-col`}>
      <div className="sidebar__app-bar flex items-center justify-between p-4 bg-dark-blue">
        <div className="flex items-center">
          <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'} mr-2`}>
            <span className="w-8 h-8">
              <img width="30" src={logo} alt="Logo" />
            </span>
          </div>
          <h1 className={`sidebar__app-title ${!open && 'scale-0 hidden'} text-white`}>RAHIMA</h1>
        </div>
        <div 
          className="sidebar__btn-close cursor-pointer text-white" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          {open ? (
            <MdChevronLeft className="sidebar__btn-icon" />
          ) : (
            <MdChevronRight className="sidebar__btn-icon" />
          )}
        </div>
      </div>

      <div className="nav">
        <span 
          className="border nav__item border-neutral-600 mb-14 bg-blue-500 text-white flex items-center cursor-pointer"
          onClick={clearChat}
          aria-label="Nouvelle conversation"
          title="Nouvelle conversation"
        >
          <div className="nav__icons mr-2">
            <MdAdd />
          </div>
          <h1 className={`${!open && 'hidden'}`}>Nouvelle conversation</h1>
        </span>
      </div>

      <div className="flex-grow flex flex-col justify-center nav__middle">
        <span 
          className="border nav__item border-neutral-600 block mb-4 bg-blue-500 text-white flex items-center cursor-pointer"
          onClick={handleDevModal}
          aria-label="Comptabilité"
          title="Comptabilité"
        >
          <div className="nav__icons mr-2">
            <MdAttachMoney />
          </div>
          <h1 className={`${!open && 'hidden'}`}>Comptabilité</h1>
        </span>
        <span 
          className="border nav__item border-neutral-600 block mb-4 bg-blue-500 text-white flex items-center cursor-pointer"
          onClick={handleDevModal}
          aria-label="Finance"
          title="Finance"
        >
          <div className="nav__icons mr-2">
            <MdAccountBalance />
          </div>
          <h1 className={`${!open && 'hidden'}`}>Finance</h1>
        </span>
        <span 
          className="border nav__item border-neutral-600 block mb-4 bg-blue-500 text-white flex items-center cursor-pointer"
          onClick={handleDevModal}
          aria-label="Scanner des factures"
          title="Scanner des factures"
        >
          <div className="nav__icons mr-2">
            <MdReceipt />
          </div>
          <h1 className={`${!open && 'hidden'}`}>Scanner des factures</h1>
        </span>
      </div>

      <div className="nav__bottom mb-4">
        <div onClick={openHelpModal} className="nav">
          <span 
            className="nav__item bg-blue-500 text-white flex items-center cursor-pointer mb-2"
            aria-label="Aide"
            title="À propos de Rahima"
          >
            <div className="nav__icons mr-2">
              <MdHelpOutline />
            </div>
            <h1 className={`${!open && 'hidden'}`}>À propos de Rahima</h1>
          </span>
        </div>

        <div onClick={() => openVideoModal("https://www.youtube.com/watch?v=dQw4w9WgXcQ")} className="nav">
          <span 
            className="nav__item bg-blue-500 text-white flex items-center cursor-pointer"
            aria-label="Vidéo explicative"
            title="Vidéo explicative"
          >
            <div className="nav__icons mr-2">
              <MdVideoLibrary />
            </div>
            <h1 className={`${!open && 'hidden'}`}>Vidéo explicative</h1>
          </span>
        </div>
      </div>

      <Modal title="Paramètres" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal>

      <Modal title="En cours de Développement" modalOpen={devModalOpen} setModalOpen={setDevModalOpen}>
        <div className="p-4">
          <p>Cette fonctionnalité est actuellement en cours de développement.</p>
        </div>
      </Modal>

      <Modal title="À propos de Rahima" modalOpen={helpModalOpen} setModalOpen={setHelpModalOpen}>
        <div className="p-4">
          <p>Rahima est un chatbot spécialisé dans le domaine de la comptabilité en Algérie. Voici quelques-unes des fonctionnalités de Rahima :</p>
          {/* Détails sur Rahima */}
        </div>
      </Modal>

      <Modal title="Vidéo explicative" modalOpen={videoModalOpen} setModalOpen={handleCloseVideoModal}>
        <div className="p-4">
          {videoUrl && (
            <ReactPlayer
              url={videoUrl}
              playing={videoPlaying}
              controls
              width="100%"
              height="400px"
              onEnded={handleVideoEnded}
            />
          )}
        </div>
      </Modal>
    </section>
  );
};

export default SideBar;
