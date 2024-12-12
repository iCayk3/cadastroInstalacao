import { useState } from "react";
import DashPizza from "../../components/DashPizza";
import DataTable from "../../components/DataTable";
import TableComponent from "../../components/TableComponent";
import useFetch from "../../Services/useFetch";
import styles from './Overview.module.css'

export default function Overview(){

    const apiUrl = process.env.REACT_APP_API_URL;
    const today = new Date();   
    const [dataConsulta, setDataConsulta] = useState(today.toISOString().slice(0, 10))
    const { data, loading, error} = useFetch(`${apiUrl}/registros/servicos/mensais/resumo?filtro=${dataConsulta}`)

    const selectData = (even) => {
        setDataConsulta(even.toISOString().slice(0, 10))
    }

    return (
        <main className={styles.main}>
            <section className={styles.gridItem}><DataTable filtro={dataConsulta}/></section>
            <section className={styles.gridItem}><TableComponent dataApiCto={data} loadingCto={loading} errorCto = {error} aoSelectData={(e) => selectData(e)}/></section>
            <section className={styles.gridItem}><DashPizza filtro={dataConsulta}/></section>
        </main>
    )
}