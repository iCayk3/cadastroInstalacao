import DashPizza from "../../components/DashPizza";
import DataTable from "../../components/DataTable";
import TableComponent from "../../components/TableComponent";
import useFetch from "../../Services/useFetch";
import styles from './Overview.module.css'

export default function Overview(){

    const { data, loading, error} = useFetch(`http://localhost:8080/registros/servicos/mensais/resumo`)

    return (
        <main className={styles.main}>
            <section className={styles.gridItem}><DataTable/></section>
            <section className={styles.gridItem}><TableComponent dataApiCto={data} loadingCto={loading} errorCto = {error}/></section>
            <section className={styles.gridItem}><DashPizza /></section>
        </main>
    )
}