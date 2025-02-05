import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Escolha o estilo que preferir
import styles from "./PopupPreview.module.scss"; // Importação do SCSS
import { Check } from "lucide-react"; // Ícone de confirmação

const PopupPreview = ({ rawJson, onClose, onCopy, copied }) => {
  const codeBlockRef = useRef(null);

  // Fecha o popup se clicar fora do conteúdo
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Efeito para aplicar o highlight.js após a renderização do componente
  useEffect(() => {
    // Aplica a estilização do highlight.js ao conteúdo JSON
    if (codeBlockRef.current) {
      hljs.highlightElement(codeBlockRef.current);
    }
  }, [rawJson]);

  return (
    <div className={styles.popupOverlay} onClick={handleOverlayClick}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Renderizando JSON estilizado com highlight.js */}
        <div className={styles.codeBlock}>

        <pre 
            className="codeBlock hljs language-json" 
            ref={codeBlockRef} 
            style={{ 
                whiteSpace: "pre-wrap", // Mantém quebras de linha e permite quebra automática 
                wordWrap: "break-word"  // Quebra palavras longas 
            }}
            >
            {rawJson}
        </pre>
        </div>

        <div className={styles.popupButtons}>
          <div className={styles.optionButton} onClick={onClose}>Editar</div>
          <div className={`${styles.optionButton} ${copied ? styles.copied : ""}`} onClick={onCopy}>
            {copied ? <Check size={20} /> : "Copiar"} {/* Ícone de confirmação */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupPreview;
