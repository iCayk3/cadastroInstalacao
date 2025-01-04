import { useState } from "react";
import DashPizza from "../../components/DashPizza";
import DataTable from "../../components/DataTable";
import TableComponent from "../../components/TableComponent";
import useFetch from "../../Services/useFetch";
import styled from "styled-components";

const MainOverviewEstilizada = styled.main`
        margin: 0 4%;
        width: 90%;
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-columns: 80% 20%;
        grid-auto-rows: auto;
        gap: 20px;
        box-sizing: border-box;
        section:nth-child(3){
            grid-column: span 2;
        }
        section {       
            background-color: #f2f2f2;
            padding: 20px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 8px;
        }

        @media only screen and (max-width: 1438px) {
            display: block;
            section{
                margin: 12px 0 0 20px;
            }
            section:nth-child(3){
                grid-column: none;
            }
            box-sizing: border-box;
            grid-auto-rows: none
        }
        @media only screen and (max-width: 998px) {
            display: block;
            section{
                margin: 12px 0 0 20px;
            }
            section:nth-child(3){
                grid-column: none;
            }
            box-sizing: border-box;
            grid-auto-rows: none
        }
        @media only screen and (max-width: 768px) {
            display: block;
            section{
                margin: 12px 0 0 20px;
            }
            section:nth-child(3){
                grid-column: none;
            }
            box-sizing: border-box;
            grid-auto-rows: none
        }
        @media only screen and (max-width: 600px) {
            display: block;
            section{
                margin: 12px 0 0 20px;
            }
            section:nth-child(3){
                grid-column: none;
            }
            box-sizing: border-box;
            grid-auto-rows: none
        }

    `
const apiUrl = process.env.REACT_APP_API_URL;
const today = new Date();

const Overview = () => {

    const [dataConsulta, setDataConsulta] = useState(today.toISOString().slice(0, 10))
    const { data, loading, error } = useFetch(`${apiUrl}/registros/servicos/mensais/resumo?filtro=${dataConsulta}`)

    const selectData = (even) => {
        setDataConsulta(even.toISOString().slice(0, 10))
    }

    return (
        <MainOverviewEstilizada>
            <section><DataTable filtro={dataConsulta} /></section>
            <section><TableComponent dataApiCto={data} loadingCto={loading} errorCto={error} aoSelectData={(e) => selectData(e)} /></section>
            <section><DashPizza filtro={dataConsulta} /></section>
        </MainOverviewEstilizada>
    )
}

export default Overview;