import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import SelectApp from '../SelectApp';
import InputTextApp from '../InputTextApp';
import * as React from 'react';
import styled from 'styled-components';
import AlertAppAutoHide from "../AlertAppAutoHide";
import DialogConfirme from "../DialogConfirme";
import EditIcon from '@mui/icons-material/Edit';

const DivTableEstilizada = styled.div`
    margin-top: 30px;
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    .form-group input, select{
      width: 90%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    table,
    input {
      box-sizing: border-box;
      width: 100%;
      border-collapse: collapse;
    }

    table,
    th,
    td,
    input {
      border: 1px solid #ddd;
    }

    th,
    td,
    input {
      padding: 10px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    .editar {
      font-size: 20px;
      text-align: center;
      cursor: pointer;
    }
    .excluir{
      text-align: center;
      cursor: pointer;
    }

    .editar-ed {
      text-align: center;
    }

    .editar-ed svg {
      margin: 0 4px;
    }

    .tableLine {
      box-sizing: border-box;
    }
    .edit-exclu{
      display: flex;
      justify-content: center;
      gap: 8px;
    }
  `
const apiUrl = process.env.REACT_APP_API_URL;

const TableHorizontal = ({ data, loading, error, aoSalvar, alertMessage, onclose, procedimentos, onFormSubmit }) => {

  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (row) => {
    setEditRowId(row.id);
    setFormData({ ...row });
  };

  const handleExcludClick = async (row) => {

    console.log(row.id);

      try {
          const response = await fetch(`${apiUrl}/registros/${row.id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (!response.ok) {
              throw new Error('Erro ao enviar o formulário');
          }
          onFormSubmit()

      } catch (error) {
          console.error('Erro na requisição:', error);
      }
  };

  const handleInputChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    aoSalvar(editRowId, formData);
    setEditRowId(null);
    setFormData({});
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setFormData({});
  };

  return (
    <DivTableEstilizada>
      <h3>Dados Cadastrados</h3>
      {loading && <p>Carregando dados...</p>}
      {error && <p>Erro ao carregar os dados: {error.message}</p>}
      {alertMessage && <AlertAppAutoHide color={"danger"} texto={"Preencha todos os campos que ja estavam preenchidos"} onclose={onclose} animationDuration={1000}/>}
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Opções</th>
              <th>Código</th>
              <th>OLT</th>
              <th>CTO</th>
              <th>Porta</th>
              <th>Técnico</th>
              <th>Data</th>
              <th>Procedimento</th>
              <th>CTO Antiga</th>
              <th>Localidade</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {editRowId === row.id ? (
                  <>
                    <td className='editar-ed'>
                      <AiOutlineClose onClick={handleCancelClick} style={{ cursor: "pointer" }} />
                      <GiConfirmed onClick={handleSaveClick} style={{ cursor: "pointer" }} />
                    </td>
                    <td>
                      <InputTextApp onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.codigo} obrigatorio={true} nome="codigo" />
                    </td>
                    <td>
                      <SelectApp uri={`${apiUrl}/olt`} onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.nomeOlt.id} nome={"nomeOlt"} />
                    </td>
                    <td>
                      {formData.nomeOlt && <SelectApp uri={`${apiUrl}/olt/${formData.nomeOlt}/cto`} onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.nomeCto.id} nome={"nomeCto"} />}
                    </td>
                    <td>
                      {formData.nomeCto && <SelectApp uri={`${apiUrl}/olt/cto/${formData.nomeCto}/portas`} onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.porta.id} nome={"porta"} />}
                    </td>
                    <td>
                      <SelectApp uri={`${apiUrl}/tecnico/equipes`} onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.nomeEquipeTecnica.id} nome={"nomeEquipeTecnica"} />
                    </td>
                    <td>
                      <div className="form-group">
                        <input
                          id="date"
                          name="data"
                          type="date"
                          value={formData.data}
                          required
                          onChange={(valor) => handleInputChange(valor.target.value, valor.target.name)}
                        /></div>
                    </td>
                    <td>
                      <div className="form-group">
                        <select
                          value={formData.procedimento}
                          onChange={(valor) => handleInputChange(valor.target.value, valor.target.name)}
                          required
                          name='procedimento'
                        >
                          <option value="">Selecione o procedimento</option>
                          {procedimentos.map((item) => (
                            <option key={item.id} value={item.id}>{item.id === formData.procedimento ? item.label : item.id}</option>
                          ))}

                        </select>
                      </div>
                    </td>
                    <td>
                      <InputTextApp onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.ctoAntiga} nome="ctoAntiga" />
                    </td>
                    <td>
                      <InputTextApp onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.localidade} obrigatorio nome="localidade" />
                    </td>
                    <td>
                      <InputTextApp onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.observacao} nome="observacao" />
                    </td>
                  </>
                ) : (
                  <>
                    <td                     
                      className="edit-exclu"
                    >
                      <DialogConfirme 
                        aoAcao={() => (handleEditClick(row))} 
                        botaoEsquerdo={"Cancelar"} 
                        BotaoDireito={"Editar"} 
                        icon={<EditIcon color='primary'/>}
                        textoDialog={"Você está preste a editar o registro, deseja continuar?"}
                        tituloDialog={"Editar registro?"}
                      />
                      <DialogConfirme 
                        aoAcao={() => (handleExcludClick(row))} 
                        botaoEsquerdo={"Cancelar"} 
                        BotaoDireito={"Excluir"} 
                        icon={<DeleteIcon color='danger'/>}
                        textoDialog={"Você está preste a excluir o registro, deseja continuar?"}
                        tituloDialog={"Excluir registro?"}
                      />
                    </td>
                    <td>{row.codigo}</td>
                    <td>{row.nomeOlt}</td>
                    <td>{row.nomeCto}</td>
                    <td>{row.porta}</td>
                    <td>{row.nomeEquipeTecnica}</td>
                    <td>{row.data}</td>
                    <td>{row.procedimento}</td>
                    <td>{row.ctoAntiga}</td>
                    <td>{row.localidade}</td>
                    <td>{row.observacao}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>Nenhum dado cadastrado.</p>
      )}
    </DivTableEstilizada>
  );
};

export default TableHorizontal;
