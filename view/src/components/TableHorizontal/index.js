import React from 'react';
import './TableHorizontal.css'

const TableHorizontal = ({ data, loading, error }) => {

  return (
    <div className="table-container">
      <h3>Dados Cadastrados</h3>
      {loading && <p>Carregando dados...</p>}
      {error && <p>Erro ao carregar os dados: {error.message}</p>}

      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>CTO</th>
              <th>Porta</th>
              <th>OLT</th>
              <th>Técnico</th>
              <th>Data</th>
              <th>Procedimento</th>
              <th>CTO Antiga</th>
              <th>Localidade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.codigo}</td>
                <td>{row.nomeCto}</td>
                <td>{row.porta}</td>
                <td>{row.nomeOlt}</td>
                <td>{row.nomeEquipeTecnica}</td>
                <td>{row.data}</td>
                <td>{row.procedimento}</td>
                <td>{row.ctoAntiga}</td>
                <td>{row.localidade}</td>
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
