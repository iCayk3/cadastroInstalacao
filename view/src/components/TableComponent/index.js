import React from 'react';
import './TableComponent.css'
import BasicDatePicker from '../BasicDatePicker';

const TableComponent = ({dataApiCto, loagdinCto, errorCto, aoSelectData}) => {

    if (loagdinCto) return <p>Carregando...</p>;
    if (errorCto) return <p>Erro ao carregar os dados: {errorCto}</p>;

    // Verifica se `dataApiCto` existe e é um objeto
    if (!dataApiCto || typeof dataApiCto !== 'object') {
        return <p>Nenhum dado disponível.</p>;
    }

    return (
        <div className='tablecomponent'>
            <h1>Total mensal</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Instalação</th>
                        <td>{dataApiCto.instalacao}</td>
                    </tr>
                    <tr>
                        <th>Mudança de Endereço</th>
                        <td>{dataApiCto.mudancaEndereco}</td>
                    </tr>
                    <tr>
                        <th>Reparo</th>
                        <td>{dataApiCto.reparo}</td>
                    </tr>
                    <tr>
                        <th>Troca de Equipamento</th>
                        <td>{dataApiCto.trocaEquipamento}</td>
                    </tr>
                    <tr>
                        <th>Cancelamento</th>
                        <td>{dataApiCto.cancelamento}</td>
                    </tr>
                    <tr>
                        <th>Reativação</th>
                        <td>{dataApiCto.reativacao}</td>
                    </tr>
                    <tr>
                        <th>Migração</th>
                        <td>{dataApiCto.migracao}</td>
                    </tr>
                </tbody>
            </table>
            <BasicDatePicker label={"Selecione o ano e mês"} views={['month']} aoAlterado={aoSelectData} open={'month'}/>
        </div>
    );
};

export default TableComponent;
