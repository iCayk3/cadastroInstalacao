import React from 'react';
import './TableHorizontal.css'
import { RiFileEditFill } from "react-icons/ri";
import { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import SelectApp from '../SelectApp';

const TableHorizontal = ({ data, loading, error, aoSalvar }) => {

  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({}); 
  const [olt, setOlt] = useState('');

  const selectOlt = (id) => {
    setOlt(id); 
  };



  const handleEditClick = (row) => {
    console.log(row)
    setEditRowId(row.id); 
    setFormData({ ...row });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
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
                      <AiOutlineClose onClick={handleCancelClick} style={{cursor:"pointer"}}/>
                      <GiConfirmed onClick={handleSaveClick} style={{cursor:"pointer"}}/>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <SelectApp uri={"http://localhost:8080/olt"} onSelectChange={selectOlt} valor={row.nomeOlt}/>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="nomeCto"
                        value={formData.nomeCto}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="porta"
                        value={formData.porta}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="nomeEquipeTecnica"
                        value={formData.nomeEquipeTecnica}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="data"
                        value={formData.data}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="procedimento"
                        value={formData.procedimento}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ctoAntiga"
                        value={formData.ctoAntiga}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="localidade"
                        value={formData.localidade}
                        onChange={handleInputChange}
                      />
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
