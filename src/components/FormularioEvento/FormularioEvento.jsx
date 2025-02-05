import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './FormularioEvento.module.scss'; // Importe o módulo SCSS
import PopupPreview from '../PopupPreview/PopupPreview'; // Importando o componente de PopupPreview

const FormularioEvento = () => {
  const [evento, setEvento] = useState({
    location: {
      title: '',
      address: ''
    },
    description: '',
  });

  const [customLocation, setCustomLocation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [jsonElement, setJsonElement] = useState('');
  const [rawJsonElement, setRawJsonElement] = useState(''); // JSON puro para cópia
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prev) => ({
      ...prev, 
      [name]: value
    }));
  };

  const handleLocationSelect = (title) => {
    if (title === "Templo Novo") {
      setEvento((prev) => ({
        ...prev,
        location: {
          title,
          address: "Igreja Batista Farol - R. Afonso Barbosa de Oliveira, 1777 - Lot. Oceania III, João Pessoa - PB, 58031-120, Brazil"
        }
      }));
      setCustomLocation(false);
    } else if (title === "Templo Sede") {
      setEvento((prev) => ({
        ...prev,
        location: {
          title,
          address: "Igreja Batista Farol - Rua Anita Costa Colaço, 55 – Pedro Gondim"
        }
      }));
      setCustomLocation(false);
    } else {
      setEvento((prev) => ({
        ...prev,
        location: {
          title: "",
          address: ""
        }
      }));
      setCustomLocation(true);
    }
  };

  const handleCustomLocationChange = (e) => {
    const { name, value } = e.target;
    setEvento((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const handleDescriptionChange = (value) => {
    setEvento((prev) => ({
      ...prev,
      description: value
    }));
  };

  const handleGenerateElement = () => {
    const elemento = {
      Event: {}
    };
  
    if (evento.title) elemento.Event.Title = evento.title;
  
    if (evento.location.title || evento.location.address) {
      elemento.Event.Location = {};
      if (evento.location.title) elemento.Event.Location.Title = evento.location.title;
      if (evento.location.address) elemento.Event.Location.Address = evento.location.address;
    }
  
    const isEmptyDescription = (description) => {
      const div = document.createElement("div");
      div.innerHTML = description;
      return !div.textContent.trim();
    };
  
    if (evento.description && !isEmptyDescription(evento.description)) {
      elemento.Event.Description = evento.description;
    }
  
    if (Object.keys(elemento.Event).length === 0) {
      alert("Nenhum dado informado!");
      return;
    }
  
    const jsonPuro = JSON.stringify(elemento)
    .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, match => match.replace(/"/g, '\\"')); 
    setRawJsonElement(jsonPuro); // Guarda o JSON puro
    setShowPopup(true);
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(rawJsonElement)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reseta após 2 segundos
      })
      .catch(err => console.error("Erro ao copiar: ", err));
  };
  

  return (
    <>
      <form className={styles.formulario}>

        <div>
          <label>Local:</label>
          <div className={styles.locationContainer}>
            {["Templo Sede", "Templo Novo", "Outro"].map((option) => (
              <div
                key={option}
                className={`${styles.locationButton} ${(evento.location.title === option || (option === "Outro" && customLocation)) ? styles.selected : ''}`}
                onClick={() => handleLocationSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {customLocation && (
          <>
            <div>
              <label>Local nome:</label>
              <input
                type="text"
                name="title"
                value={evento.location.title}
                onChange={handleCustomLocationChange}
                placeholder="Digite o título da localização"
              />
            </div>
            <div>
              <label>Local endereço:</label>
              <input
                type="text"
                name="address"
                value={evento.location.address}
                onChange={handleCustomLocationChange}
                placeholder="Digite o endereço"
              />
            </div>
          </>
        )}

        {!customLocation && evento.location.address && (
          <div>
            <label>Endereço:</label>
            <input type="text" value={evento.location.address} disabled />
          </div>
        )}

        <div>
          <label>Descrição:</label>
          <ReactQuill
            value={evento.description}
            onChange={handleDescriptionChange}
            placeholder="Digite a descrição do evento"
            modules={{
              toolbar: [
                [{ 'header': '1' }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link'],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                ['clean']
              ]
            }}
            className={styles.quillEditor}
          />
        </div>

        <button type="button" onClick={handleGenerateElement}>Gerar Elemento</button>
      </form>

      {/* Exibir o PopupPreview */}
      {showPopup && (
        <PopupPreview 
          rawJson={rawJsonElement} 
          onClose={() => setShowPopup(false)} 
          onCopy={handleCopyToClipboard} 
          copied={copied} 
        />

      )}
    </>
  );
};

export default FormularioEvento;
