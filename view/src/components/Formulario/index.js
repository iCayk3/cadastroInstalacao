
import './Formulario.css'
import React, { useEffect, useState } from 'react';
import useFetch from '../../Services/useFetch';
import useFetchTecnico from '../../Services/useFetchTecnico';

const Formulario = ({ onFormSubmit }) => {

  const { data, loading, error } = useFetch('http://localhost:8080/olt');
  
  const { dataApiTecnico, loadingTecnico, errorTecnico } = useFetchTecnico(`http://localhost:8080/tecnico/equipes`);



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
  const [dataApiCto, setDataApiCto] = useState([]);
  const [loadingCto, setLoadingCto] = useState(false);
  const [errorCto, setErrorCto] = useState(null);
  const [dataApiPorta, setDataApiPorta] = useState([]);
  const [loadingPorta, setLoadingPorta] = useState(false);
  const [errorPorta, setErrorPorta] = useState(null);

  useEffect(() => {
    // Define a dataregistro atual no formato YYYY-MM-DD ao carregar o componente
    const today = new Date();
    setData(today.toISOString().slice(0, 10)); // Formato YYYY-MM-DD
  }, []);

  useEffect(() => {
    if (olt) {
      const fetchCto = async () => {
        setLoadingCto(true);
        setErrorCto(null);
        try {
          const response = await fetch(`http://localhost:8080/olt/${olt}/cto`);
          if (!response.ok) throw new Error('Erro ao carregar CTO');
          const data = await response.json();
          setDataApiCto(data);
        } catch (error) {
          setErrorCto(error.message);
        } finally {
          setLoadingCto(false);
        }
      };
      fetchCto();
    } else {
      // Reseta as CTOs quando nenhuma OLT é selecionada
      setDataApiCto([]);
    }
  }, [olt]);

  useEffect(() => {
    if (cto) {
      const fetchCto = async () => {
        setLoadingPorta(true);
        setErrorPorta(null);
        try {
          const response = await fetch(`http://localhost:8080/olt/cto/${cto}/portas`);
          if (!response.ok) throw new Error('Erro ao carregar CTO');
          const data = await response.json();
          setDataApiPorta(data);
        } catch (error) {
          setErrorPorta(error.message);
        } finally {
          setLoadingPorta(false);
        }
      };
      fetchCto();
    } else {
      // Reseta as CTOs quando nenhuma OLT é selecionada
      setDataApiPorta([]);
    }
  }, [cto]);

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
      console.log(JSON.stringify(formData))
      const response = await fetch('http://localhost:8080/registros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Converte os dados do formulário em JSON
      });
      console.log(formData)
      console.log(response)
      onFormSubmit();
      if (!response.ok) {
        throw new Error('Erro ao enviar o formulário');
      }

      const result = await response.json();
      console.log(JSON.stringify(formData))
      console.log('Dados enviados com sucesso:', result);

      // Opcional: Resetar o formulário após o envio bem-sucedido
      setCodigo('');
      setOlt('');
      setCto('');
      setPorta('');
      setTecnico('');
      setData('');
      setProcedimento('');
      setCtoAntiga('');
      setLocalidade('');

    } catch (error) {
      console.error('Erro na requisição:', error);
      //alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
    }
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
            <label>OLT:</label>

            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            {data && (
              <select
                value={olt}
                onChange={(e) => setOlt(e.target.value)}
                required
              >
                <option value="">Selecione a OLT</option>
                {data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome} {/* A propriedade `nome` é um exemplo; ajuste conforme sua API */}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="form-group">
            <label>CTO:</label>

            {loadingCto && <p>Carregando...</p>}
            {errorCto && <p>Erro: {errorCto}</p>}
            {dataApiCto && (
              <select
                value={cto}
                onChange={(e) => setCto(e.target.value)}
                required
              >
                <option value="">Selecione a CTO</option>

                {dataApiCto.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nomeCto} {/* A propriedade `nome` é um exemplo; ajuste conforme sua API */}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="form-group">
            <label>Porta:</label>

            {loadingPorta && <p>Carregando...</p>}
            {errorPorta && <p>Erro: {errorPorta}</p>}
            {dataApiPorta && (
              <select
                value={porta.idPorta}
                onChange={(e) => setPorta(e.target.value)}
                required
              >
                <option value={porta}>Selecione a Porta</option>

                {dataApiPorta.map((item) => (
                  <option key={item.idPorta} value={item.idPorta}>
                    {item.idPorta +" " + item.numeroPorta + ": " + item.codigo} {/* A propriedade `nome` é um exemplo; ajuste conforme sua API */}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label>Técnico:</label>
            {loadingTecnico && <p>Carregando...</p>}
            {errorTecnico && <p>Erro: {errorPorta}</p>}
            {dataApiTecnico && (
              <select
                value={tecnico.id}
                onChange={(e) => setTecnico(e.target.value)}
                required
              >
                <option value={tecnico}>Selecione a equipe técnica</option>

                {dataApiTecnico.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nomeEquipe} {/* A propriedade `nome` é um exemplo; ajuste conforme sua API */}
                  </option>
                ))}
              </select>
            )}
          </div>
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
              <option value="">Selecione o Técnico</option>
              <option value="INSTALACAO">INSTALAÇÃO</option>
              <option value="MUDANCA_ENDERECO">MUDANCA DE ENDEREÇO</option>
              <option value="REPARO">REPARO</option>
              <option value="TROCA_EQUIPAMENTO">TROCA DE EQUIPAMENTO</option>
              <option value="CANCELAMENTO">CANCELAMENTO</option>
              <option value="REATIVACAO">REATIVAÇÃO</option>
              <option value="MIGRACAO">MIGRAÇÃO</option>
            </select>
          </div>
          <div className="form-group">
            <label>CTO Antiga:</label>
            <input
              type="text"
              value={ctoAntiga}
              onChange={(e) => setCtoAntiga(e.target.value)}
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