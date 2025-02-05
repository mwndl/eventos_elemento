// App.jsx
import React from 'react';
import FormularioEvento from './components/FormularioEvento/FormularioEvento';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <h1>Criar Elemento</h1>
      <h2>Utilize a ferramenta abaixo para complementar os dados do evento. Cole o código gerado diretamente na descrição do evento dentro do Google Agenda.</h2>
      <FormularioEvento />
    </div>
  );
}

export default App;
