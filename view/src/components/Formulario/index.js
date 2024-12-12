
import './Formulario.css'
import React, { useEffect, useState } from 'react';
import SelectApp from '../SelectApp';
import InputTextApp from '../InputTextApp';

const Formulario = ({ onFormSubmit }) => {

  const apiUrl = process.env.REACT_APP_API_URL;

  // Estados para armazenar os valores dos campos
  const [codigo, setCodigo] = useState('');
  const [cto, setCto] = useState('');
  const [porta, setPorta] = useState('');
  const [olt, setOlt] = useState('');
  const [tecnico, setTecnico] = useState('');
  const [dataregistro, setData] = useState('');
  const [procedimento, setProcedimento] = useState('');
  const [ctoAntiga, setCtoAntiga] = useState('');
  const [localidade, setLocalidade] = useState('');
  const today = new Date();

  const selectOlt = (id) => {
    setOlt(id); 

  };
  const selectCto = (id) => {
    setCto(id); 
  };

  const selectPorta = (id) => {
    setPorta(id);
  };

  const selectTecnico = (id) => {
    setTecnico(id)
  }

  const selectCodigo = (item) => {
    setCodigo(item)
  }

  const selectCtoAntiga = (item) => {
    setCtoAntiga(item)
  }

  const selectLocalidade = (item) => {
    setLocalidade(item)
  }

  useEffect(() => {
    const today = new Date();   
    setData(today.toISOString().slice(0, 10)); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const formData = {
      codigo: parseInt(codigo, 10),
      olt: parseInt(olt, 10),
      cto: parseInt(cto, 10),
      porta: parseInt(porta, 10),
      tecnico: parseInt(tecnico, 10),
      dataregistro,
      procedimento,
      ctoAntiga,
      localidade,
    };

    try {
      const response = await fetch(`${apiUrl}/registros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Converte os dados do formulário em JSON
      });
      onFormSubmit();
      if (!response.ok) {
        throw new Error('Erro ao enviar o formulário');
      }

      // Opcional: Resetar o formulário após o envio bem-sucedido
      selectCodigo('');
      selectOlt('');
      selectCto('');
      selectPorta('');
      selectTecnico('');
      setData(today.toISOString().slice(0, 10));
      setProcedimento('');
      selectCtoAntiga('');
      selectLocalidade('');

    } catch (error) {
      console.error('Erro na requisição:', error);
      //alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <InputTextApp label="CÓDIGO" onSelectChange={selectCodigo} valor={codigo} obrigatorio={true} />
          <SelectApp label="OLT" uri={`${apiUrl}/olt`} onSelectChange={selectOlt} valor={olt} />
          {olt && <SelectApp label="CTO" uri={`${apiUrl}/olt/${olt}/cto`} onSelectChange={selectCto} valor={cto} />}
          {cto && <SelectApp label="PORTA" uri={`${apiUrl}/olt/cto/${cto}/portas`} onSelectChange={selectPorta} valor={porta} />}
          <SelectApp label="TÉCNICO" uri={`${apiUrl}/tecnico/equipes`} onSelectChange={selectTecnico} valor={tecnico} />

          <div className="form-group">
            <label>Data:</label>
            <input
              id="date"
              name="date"
              type="date"
              value={dataregistro}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Procedimento:</label>
            <select
              value={procedimento}
              onChange={(e) => setProcedimento(e.target.value)}
              required
            >
              <option value="">Selecione o procedimento</option>
              <option value="INSTALACAO">INSTALAÇÃO</option>
              <option value="MUDANCA_ENDERECO">MUDANCA DE ENDEREÇO</option>
              <option value="REPARO">REPARO</option>
              <option value="TROCA_EQUIPAMENTO">TROCA DE EQUIPAMENTO</option>
              <option value="CANCELAMENTO">CANCELAMENTO</option>
              <option value="REATIVACAO">REATIVAÇÃO</option>
              <option value="MIGRACAO">MIGRAÇÃO</option>
            </select>
          </div>
          <InputTextApp label="CTO antiga" onSelectChange={selectCtoAntiga} valor={ctoAntiga} obrigatorio={false} />
          <InputTextApp label="Localidade" onSelectChange={selectLocalidade} valor={localidade} obrigatorio={true} />
        </div>
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>
    </div>
  );
}

export default Formulario