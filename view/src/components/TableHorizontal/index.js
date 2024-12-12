import './TableHorizontal.css'
import { RiFileEditFill } from "react-icons/ri";
import { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import SelectApp from '../SelectApp';
import InputTextApp from '../InputTextApp';
import * as React from 'react';
import AlertApp from '../AlertApp';


const TableHorizontal = ({ data, loading, error, aoSalvar, alertMessage, onclose }) => {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (row) => {
    setEditRowId(row.id);
    setFormData({ ...row });
  };

  const handleInputChange = (value, name) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async() => {
    aoSalvar(editRowId, formData);
    setEditRowId(null);
    setFormData({});
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setFormData({});
  };

  return (
    <div className="table-container">
      <h3>Dados Cadastrados</h3>
      {loading && <p>Carregando dados...</p>}
      {error && <p>Erro ao carregar os dados: {error.message}</p>}
      {alertMessage && <AlertApp severity={"error"} texto={"Preencha todos os campos que ja estavam preenchidos"} fechar={onclose}/>}
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
                      <InputTextApp onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.codigo} obrigatorio={true} nome="codigo"/>
                    </td>
                    <td>
                      <SelectApp uri={`${apiUrl}/olt`} onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.nomeOlt.id} nome={"nomeOlt"}/>
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
                          <option value="INSTALACAO">INSTALAÇÃO</option>  
                          <option value="MUDANCA_ENDERECO">MUDANCA DE ENDEREÇO</option>
                          <option value="REPARO">REPARO</option>
                          <option value="TROCA_EQUIPAMENTO">TROCA DE EQUIPAMENTO</option>
                          <option value="CANCELAMENTO">CANCELAMENTO</option>
                          <option value="REATIVACAO">REATIVAÇÃO</option>
                          <option value="MIGRACAO">MIGRAÇÃO</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <InputTextApp onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.ctoAntiga} obrigatorio={false} nome="ctoAntiga"/>
                    </td>
                    <td>
                      <InputTextApp onSelectChange={(valor, nome) => handleInputChange(valor, nome)} valor={formData.localidade} obrigatorio={true}nome="localidade" />
                    </td>
                  </>
                ) : (
                  <>
                    <td
                      onClick={() => handleEditClick(row)}
                      className="editar"
                    >
                      <RiFileEditFill />
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
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>Nenhum dado cadastrado.</p>
      )}
    </div>
  );
};

export default TableHorizontal;
