// App.jsx
import React from 'react';
import FormularioEvento from './components/FormularioEvento/FormularioEvento';
import styles from './App.module.scss';

function App() {
  return (
    <div className="App">
      <h1>Formulário de Evento</h1>
      <FormularioEvento />
    </div>
  );
}

export default App;
