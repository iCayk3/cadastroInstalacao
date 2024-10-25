
import './Formulario.css'
import React, { useState } from 'react';

const Formulario = (props) => {
  // Estados para armazenar os valores dos campos
  const [codigo, setCodigo] = useState('');
  const [cto, setCto] = useState('');
  const [porta, setPorta] = useState('');
  const [olt, setOlt] = useState('');
  const [tecnico, setTecnico] = useState('');
  const [data, setData] = useState('');
  const [procedimento, setProcedimento] = useState('');
  const [ctoAntiga, setCtoAntiga] = useState('');
  const [localidade, setLocalidade] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      codigo,
      cto,
      porta,
      olt,
      tecnico,
      data,
      procedimento,
      ctoAntiga,
      localidade,
    };
    console.log('Dados enviados:', formData);
    // Aqui você pode enviar os dados para o backend ou processá-los como desejar
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Código:</label>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>CTO:</label>
            <input
              type="text"
              value={cto}
              onChange={(e) => setCto(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Porta:</label>
            <input
              type="text"
              value={porta}
              onChange={(e) => setPorta(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>OLT:</label>
            <input
              type="text"
              value={olt}
              onChange={(e) => setOlt(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Técnico:</label>
            <select
              value={tecnico}
              onChange={(e) => setTecnico(e.target.value)}
              required
            >
              <option value="">Selecione o Técnico</option>
              <option value="Tecnico 1">Técnico 1</option>
              <option value="Tecnico 2">Técnico 2</option>
              <option value="Tecnico 3">Técnico 3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Data:</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Procedimento:</label>
            <input
              value={procedimento}
              onChange={(e) => setProcedimento(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>CTO Antiga:</label>
            <input
              type="text"
              value={ctoAntiga}
              onChange={(e) => setCtoAntiga(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Localidade:</label>
            <input
              type="text"
              value={localidade}
              onChange={(e) => setLocalidade(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>
    </div>
  );
}

export default Formulario