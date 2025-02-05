import React from "react";
import styles from "./PopupPreview.module.scss"; // Importação do SCSS
import { Check } from "lucide-react"; // Ícone de confirmação

const PopupPreview = ({ rawJson, onClose, onCopy, copied }) => {
  // Fecha o popup se clicar fora do conteúdo
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Função para estilizar o JSON dinamicamente
  const formatJson = (jsonString) => {
    return jsonString
      .replace(/"(\w+)"(?=\s*:)/g, '<span style="color: #42a5f5;">"$1"</span>') // Chaves em azul
      .replace(/: "(.*?)"/g, ': <span style="color: #f38b40;">"$1"</span>') // Strings em laranja
      .replace(/: (\d+)/g, ': <span style="color: #8bc34a;">$1</span>'); // Números em verde
  };

  return (
    <div className={styles.popupOverlay} onClick={handleOverlayClick}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {/* Renderizando JSON estilizado */}
        <pre className={styles.codeBlock} dangerouslySetInnerHTML={{ __html: formatJson(rawJson) }} />

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
