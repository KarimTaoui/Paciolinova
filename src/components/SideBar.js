import React, { useState, useContext, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight, MdAdd, MdHelpOutline, MdAttachMoney, MdAccountBalance, MdReceipt } from 'react-icons/md';
import { ChatContext } from '../context/chatContext';
import logo from '../assets/logo.png';
import Modal from './Modal';
import Setting from './Setting';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [, , clearMessages] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [devModalOpen, setDevModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false); // State for help modal

  function handleResize() {
    setOpen(window.innerWidth > 720);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const clearChat = () => clearMessages();

  const handleDevModal = () => setDevModalOpen(true);

  const openHelpModal = () => setHelpModalOpen(true); // Function to open help modal

  return (
    <section className={`sidebar ${open ? 'w-screen lg:w-96' : 'w-16'}`}>
      <div className="sidebar__app-bar">
        <div className="flex items-center">
          <div className={`sidebar__app-logo ${!open && 'scale-0 hidden'} mr-2`}>
            <span className="w-8 h-8">
              <img width="30" src={logo} alt="Logo" />
            </span>
          </div>
          <h1 className={`sidebar__app-title ${!open && 'scale-0 hidden'}`}>RAHIMA</h1>
        </div>
        <div 
          className="sidebar__btn-close" 
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          {open ? (
            <MdChevronLeft className="text-slate-700 sidebar__btn-icon" />
          ) : (
            <MdChevronRight className="text-slate-700 sidebar__btn-icon" />
          )}
        </div>
      </div>
      <div className="nav">
        <span 
          className="border nav__item border-neutral-600 mb-14"
          onClick={clearChat}
          aria-label="Nouvelle conversation"
          title="Nouvelle conversation"
        >
          <div className="nav__icons">
            <MdAdd />
          </div>
          <h1 className={`${!open && 'hidden'}`}>Nouvelle conversation</h1>
        </span>
      </div>

      <div className="nav__middle">
        <span 
          className="border nav__item border-neutral-600 block mb-4"
          onClick={handleDevModal}
          aria-label="Comptabilité"
          title="Comptabilité"
        >
          <div className="nav__icons">
            <MdAttachMoney />
          </div>
          <h1 className={`${!open && 'hidden'}`}>Comptabilité</h1>
        </span>
        <span 
          className="border nav__item border-neutral-600 block mb-4"
          onClick={handleDevModal}
          aria-label="Finance"
          title="Finance"
        >
          <div className="nav__icons">
            <MdAccountBalance />
          </div>
          <h1 className={`${!open && 'hidden'}`}>Finance</h1>
        </span>
        <span 
          className="border nav__item border-neutral-600 block mb-4"
          onClick={handleDevModal}
          aria-label="Scanner des factures"
          title="Scanner des factures"
        >
          <div className="nav__icons">
            <MdReceipt />
          </div>
          <h1 className={`${!open && 'hidden'}`}>Scanner des factures</h1>
        </span>
      </div>

      <div className="nav__bottom">
        <div onClick={openHelpModal} className="nav">
          <span 
            className="nav__item"
            aria-label="Aide"
            title="Aide"
          >
            <div className="nav__icons">
              <MdHelpOutline />
            </div>
            <h1 className={`${!open && 'hidden'}`}>Aide</h1>
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

      {/* Help Modal */}
      <Modal title="À propos de Rahima" modalOpen={helpModalOpen} setModalOpen={setHelpModalOpen}>
        <div className="p-4">
        <p>Rahima est un chatbot spécialisé dans le domaine de la comptabilité en Algérie Voici quelques-unes des fonctionnalités de Rahima :</p><br />
        <p><strong>Assistance à la navigation :</strong> Rahima peut répondre aux questions courantes sur les comptes SCF </p><br />
        <p><strong>Calculs financiers :</strong> Rahima est capable d effectuer divers calculs financiers, facilitant ainsi la gestion des finances pour les utilisateurs.</p><br />
        <p><strong>Récupération d informations :</strong> Elle peut fournir des informations spécifiques sur demande, comme les réglementations comptables, les taux d imposition, etc.</p><br />
        <p><strong>Notifications et alertes :</strong> Rahima peut envoyer des notifications importantes et des alertes aux utilisateurs pour les tenir informés des changements et mises à jour.</p><br />
        
        


        </div>
      </Modal>
    </section>
  );
};
export default SideBar;
