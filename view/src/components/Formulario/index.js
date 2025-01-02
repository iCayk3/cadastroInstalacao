
import './Formulario.css'
import React, { useEffect, useState } from 'react';
import FieldAutoComplet from '../FieldAutoComplet';
import BasicDatePicker from '../BasicDatePicker';
import dayjs from 'dayjs';
import FloatingLabelInput from '../FloatingLabelInput';

const Formulario = ({ onFormSubmit, procedimentos }) => {

  const apiUrl = process.env.REACT_APP_API_URL;

  // Estados para armazenar os valores dos campos
  const [codigo, setCodigo] = useState('');
  const [olt, setOlt] = useState('');
  const [oltInput, setOltInput] = useState('')
  const [cto, setCto] = useState('');
  const [ctoInput, setCtoInput] = useState('')
  const [porta, setPorta] = useState('');
  const [portaInput, setPortaInput] = useState('')
  const [tecnico, setTecnico] = useState('');
  const [tecnicoInput, setTecnicoInput] = useState('')
  const [procedimento, setProcedimento] = useState('');
  const [inputProcedimento, setInputProcedimento] = useState('')
  const [ctoAntiga, setCtoAntiga] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [observacao, setObservacao] = useState('');
  const [dataregistro, setData] = useState('');

  const today = new Date();

  const selectData = (evento, value) => {
    if (value === null) {
      setData(dataregistro)
    } else {
      try {
        console.log(value.toISOString().slice(0, 10))
        setData(value.toISOString().slice(0, 10))
      } catch (e) {
        setData(dataregistro)
      }

    }
  }

  useEffect(() => {
    const today = new Date();
    setData(today.toISOString().slice(0, 10));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const formData = {
      codigo: parseInt(codigo, 10),
      olt: parseInt(olt.id, 10),
      cto: parseInt(cto.id, 10),
      porta: parseInt(porta.id, 10),
      tecnico: parseInt(tecnico.id, 10),
      dataregistro,
      procedimento: procedimento.id,
      ctoAntiga,
      localidade,
      observacao,
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
      setCodigo('')
      setOlt('');
      setCto('');
      setPorta('');
      setTecnico('');
      setData(today.toISOString().slice(0, 10));
      setProcedimento('');
      setCtoAntiga('');
      setLocalidade('');
      setObservacao('');

    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className='controll-form'>
            <FloatingLabelInput
              valor={codigo}
              obrigatorio
              labelProp={"Codigo"}
              placeholderProp={""}
              aoAlterado={(evento) => setCodigo(evento.target.value)}
            />
          </div>
          <div className='controll-form'>
            <FieldAutoComplet 
              uri={`${apiUrl}/olt`} 
              label={"OLT"} 
              aoAlterado={setOlt}
              onInputValueChange={setOltInput}
              valor={olt}
              inputValue={oltInput}
            />
          </div>
          <div className='controll-form'>
            {!olt && <FieldAutoComplet desabilitar label="CTO" />}
            {olt && <FieldAutoComplet 
              uri={`${apiUrl}/olt/${olt.id}/cto`} 
              label="CTO" 
              aoAlterado={setCto}
              onInputValueChange={setCtoInput}
              valor={cto}
              inputValue={ctoInput} 
            />}
          </div>
          <div className='controll-form'>
            {!cto && <FieldAutoComplet desabilitar label="PORTA" />}
            {cto && <FieldAutoComplet 
              uri={`${apiUrl}/olt/cto/${cto.id}/portas`} 
              label="PORTA" porta 
              aoAlterado={setPorta}
              onInputValueChange={setPortaInput}
              valor={porta}
              inputValue={portaInput}
              />}
          </div>
          <div className='controll-form'>
            <FieldAutoComplet 
              uri={`${apiUrl}/tecnico/equipes`} 
              obrigatorio 
              label={"Técnicos"} 
              aoAlterado={setTecnico}
              onInputValueChange={setTecnicoInput}
              valor={tecnico}
              inputValue={tecnicoInput}
            />
          </div>
          <div className='controll-form'>
            <FieldAutoComplet 
              dadosProcedimento={procedimentos} 
              obrigatorio label={"Procedimento"} 
              aoAlterado={setProcedimento}
              onInputValueChange={setInputProcedimento}
              valor={procedimento}
              inputValue={inputProcedimento} 
            />
          </div>
          <div className='controll-form'>
            <FloatingLabelInput
              valor={ctoAntiga}
              labelProp={"CTO antiga"}
              placeholderProp={""}
              aoAlterado={(evento) => setCtoAntiga(evento.target.value)}
            />
          </div>
          <div className='controll-form'>
            <FloatingLabelInput
              valor={localidade}
              obrigatorio
              labelProp={"Localidade"}
              placeholderProp={""}
              aoAlterado={(evento) => setLocalidade(evento.target.value)}
            />
          </div>
          <div className='controll-form'>
            <FloatingLabelInput
              valor={observacao}
              labelProp={"Observação"}
              placeholderProp={""}
              aoAlterado={(evento) => setObservacao(evento.target.value)}
            />
          </div>
          <div className='data-pick'>
            <BasicDatePicker aoAlterado={(value) => selectData(value)} label={"Selecione a data"} valor={dayjs(dataregistro)} />
          </div>
        </div>
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>
    </div>
  );
}

export default Formulario