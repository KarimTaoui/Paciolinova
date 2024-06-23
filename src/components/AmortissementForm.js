import React, { useState } from 'react';
import './AmortissementForm.css'; // Importer le fichier CSS pour les styles

const AmortissementForm = ({ onSubmit }) => {
  const [coûtAcquisition, setCoûtAcquisition] = useState('');
  const [duréeVieUtile, setDuréeVieUtile] = useState('');
  const [valeurRésiduelle, setValeurRésiduelle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(coûtAcquisition, duréeVieUtile, valeurRésiduelle);
  };

  const handleCoûtAcquisitionChange = (e) => {
    // Utiliser une regex pour limiter l'entrée à des nombres avec deux décimales au maximum
    const value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setCoûtAcquisition(value);
  };

  const handleValeurRésiduelleChange = (e) => {
    // Utiliser une regex pour limiter l'entrée à des nombres avec deux décimales au maximum
    const value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setValeurRésiduelle(value);
  };

  return (
    <div className="amortissement-form-container">
      <form onSubmit={handleSubmit} className="amortissement-form">
        <div className="form-group">
          <label htmlFor="coûtAcquisition">Coût d acquisition (en dinars) :</label>
          <input
            type="number"
            id="coûtAcquisition"
            value={coûtAcquisition}
            onChange={handleCoûtAcquisitionChange}
            step="0.01" // Permet de saisir jusqu'à deux décimales
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="duréeVieUtile">Durée de vie utile (en mois) :</label>
          <input
            type="number"
            id="duréeVieUtile"
            value={duréeVieUtile}
            onChange={(e) => setDuréeVieUtile(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="valeurRésiduelle">Valeur résiduelle (en dinars) :</label>
          <input
            type="number"
            id="valeurRésiduelle"
            value={valeurRésiduelle}
            onChange={handleValeurRésiduelleChange}
            step="0.01" // Permet de saisir jusqu'à deux décimales
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">Calculer</button>
      </form>
    </div>
  );
};

export default AmortissementForm;
