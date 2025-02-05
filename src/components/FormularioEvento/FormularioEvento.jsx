import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './FormularioEvento.module.scss'; // Importe o módulo SCSS
import PopupPreview from '../PopupPreview/PopupPreview'; // Importando o componente de PopupPreview

const FormularioEvento = () => {
  const [evento, setEvento] = useState({
    title: '',
    location: {
      title: '',
      address: ''
    },
    description: '',
  });

  const [customLocation, setCustomLocation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [jsonElement, setJsonElement] = useState('');

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
  
    if (evento.description) elemento.Event.Description = evento.description;
  
    if (Object.keys(elemento.Event).length === 0) {
      alert("Nenhum dado informado!");
      return;
    }
  
    // Convertendo JSON para string formatada
    let jsonString = JSON.stringify(elemento, null, 2);
  
    // Aplicando cor às chaves e valores sem modificar a estrutura do JSON
    jsonString = jsonString
      .replace(/"(\w+)"(?=\s*:)/g, '<span style="color: #42a5f5;">"$1"</span>') // Chaves em azul
      .replace(/: "(.*?)"/g, ': <span style="color: #f38b40;">"$1"</span>') // Valores string em laranja
      .replace(/: (\d+)/g, ': <span style="color: #8bc34a;">$1</span>'); // Valores numéricos em verde
  
    setJsonElement(jsonString);  // Passando o JSON estilizado
    setShowPopup(true);  // Exibe o popup
  };
  
  

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(jsonElement)
      .then(() => alert("Elemento copiado para a área de transferência!"))
      .catch(err => console.error("Erro ao copiar: ", err));
  };

  return (
    <>
      <form className={styles.formulario}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={evento.title}
            onChange={handleChange}
            placeholder="Digite o título do evento"
          />
        </div>

        <div>
          <label>Localização:</label>
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
              <label>Custom Location Title:</label>
              <input
                type="text"
                name="title"
                value={evento.location.title}
                onChange={handleCustomLocationChange}
                placeholder="Digite o título da localização"
              />
            </div>
            <div>
              <label>Address:</label>
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
          <label>Description:</label>
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
          jsonElement={jsonElement}
          onClose={() => setShowPopup(false)}
          onCopy={handleCopyToClipboard}
        />
      )}
    </>
  );
};

export default FormularioEvento;
