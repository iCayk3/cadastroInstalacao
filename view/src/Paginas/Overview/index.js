import DashPizza from "../../components/DashPizza";
import TableComponent from "../../components/TableComponent";
import TableStripe from "../../components/TableStripe";
import useFetchCto from "../../Services/useFetchCto";

export default function Overview(){

    const { dataApiCto, loadingCto, errorCto} = useFetchCto(`http://localhost:8080/registros/servicos/mensais/resumo`)

    return (
        <main className='main'>
            <section className='grid-item'><TableStripe uri={"http://localhost:8080/registros/all"}/></section>
            <section className='grid-item'><TableComponent dataApiCto={dataApiCto} loadingCto={loadingCto} errorCto = {errorCto}/></section>
            <section className='grid-item'><DashPizza /></section>    
        </main>
    )
}