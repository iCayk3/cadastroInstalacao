import React, { useEffect, useState } from 'react';
import FieldAutoComplet from '../FieldAutoComplet';
import BasicDatePicker from '../BasicDatePicker';
import dayjs from 'dayjs';
import FloatingLabelInput from '../FloatingLabelInput';
import styled from 'styled-components';
import AlertAppAutoHide from '../AlertAppAutoHide';

const DivFormEstilizada = styled.div`
    width: 100%;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;

    .form-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr); 
    gap: 16px; 
    box-sizing: border-box;
  }
   
  
  .submit-button {
    width: 100%;
    padding: 10px;
    background-color: #1E3CE1;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px; 
  }
  
  .submit-button:hover {
    background-color: #E14F01;
  }
  
  .data-pick {
   
    height: 56px;
  }
  .data-pick input {
    font-size: 16 px;
  }

  .data-pick {
    align-items: center;
    margin-bottom: 8px;
  }
  .controll-form {
    margin-top: 8px;
  }
  @media only screen and (max-width: 1300px) {
    .form-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr); 
      gap: 16px; 
      box-sizing: border-box;
    }
  }
  @media only screen and (max-width: 998px) {
    .form-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); 
      gap: 16px; 
      box-sizing: border-box;
    }
  }
  @media only screen and (max-width: 768px) {
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2 , 1fr); 
      gap: 16px; 
      box-sizing: border-box;
    }
  }
  @media only screen and (max-width: 600px) {
    .form-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr); 
      gap: 16px; 
      box-sizing: border-box;
    }
  }
  
`
const apiUrl = process.env.REACT_APP_API_URL;

const Formulario = ({ onFormSubmit, procedimentos, onclose }) => {



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
  const [registroOk, setRegistroOk] = useState(false)
  const [registroBad, setRegistroBad] = useState(false)

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
      setRegistroOk(true)
    } catch (error) {
      setRegistroBad(true)
      console.error('Erro na requisição:', error);
    }
  };

  const fecharAlerta = () => {
    setRegistroOk(false)
    setRegistroBad(false)
  }

  return (
    <DivFormEstilizada>
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
        {registroOk && <AlertAppAutoHide color={"success"} texto={"Registro realizado com sucesso"} onclose={() => fecharAlerta()} animationDuration={200} />}
        {registroBad && <AlertAppAutoHide color={"danger"} texto={"Algo deu errado!"} onclose={() => fecharAlerta()} animationDuration={200} />}
      </form>
    </DivFormEstilizada>
  );
}

export default Formulario