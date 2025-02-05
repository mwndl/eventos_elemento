import React from 'react';
import styles from './PopupPreview.module.scss'; // Importação do SCSS

const PopupPreview = ({ jsonElement, onClose, onCopy }) => {
  // Fecha o popup se clicar fora do conteúdo
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={handleOverlayClick}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <h2>Elemento Gerado</h2>
        <pre className={styles.codeBlock} dangerouslySetInnerHTML={{ __html: jsonElement }} />

        <div className={styles.popupButtons}>
          <div className={styles.locationButton} onClick={onClose}>Editar</div>
          <div className={styles.locationButton} onClick={onCopy}>Copiar</div>
        </div>
      </div>
    </div>
  );
};

export default PopupPreview;
