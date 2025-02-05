// App.jsx
import React from 'react';
import FormularioEvento from './components/FormularioEvento/FormularioEvento';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <h1>Criar Elemento</h1>
      <h2>Utilize a ferramenta abaixo para criar dados internos de eventos. O código gerado deve ser colado no campo "detalhes" do Google Agenda.</h2>
      <FormularioEvento />
    </div>
  );
}

export default App;
