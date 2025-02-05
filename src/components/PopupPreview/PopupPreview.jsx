import React from 'react';
import styles from './PopupPreview.module.scss'; // Importação do SCSS
import { Check } from 'lucide-react'; // Ícone de confirmação

const PopupPreview = ({ jsonElement, onClose, onCopy, copied }) => {
  // Fecha o popup se clicar fora do conteúdo
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={handleOverlayClick}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <pre className={styles.codeBlock} dangerouslySetInnerHTML={{ __html: jsonElement }} />
        
        <div className={styles.popupButtons}>
          <div className={styles.optionButton} onClick={onClose}>Editar</div>
          <div 
            className={`${styles.optionButton} ${copied ? styles.copied : ''}`} 
            onClick={onCopy}
          >
            {copied ? <Check size={20} /> : "Copiar"} {/* Substituindo ícone */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupPreview;
