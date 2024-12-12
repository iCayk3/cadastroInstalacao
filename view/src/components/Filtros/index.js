import BasicDatePicker from "../BasicDatePicker";
import FieldAutoComplet from "../FieldAutoComplet";
import styles from './Filtros.module.css'



export default function Filtros({aoAlteradoTecnico, aoAlteradoData}) {

    function selectEquipe(evento, value) {
        if (value === null) {
            aoAlteradoTecnico('')
        } else {
            aoAlteradoTecnico(value.label)
        }
    }

    function selectData(value){
        if (value === null) {
            aoAlteradoData('')
        } else {
            try{
                aoAlteradoData(value.toISOString().slice(0, 10))
            }catch(e){
                aoAlteradoData('')
            }
            
        }
    }

    return (
        <div className={styles.filtroContainer}>
            <h3 className={styles.gridItem}>Filtros</h3>
            <div className={styles.gridItem}>
                <BasicDatePicker aoAlterado={(value) => selectData(value)} label={"Selecione a data"}/>
            </div>
            <div className={styles.gridItem}>
                <FieldAutoComplet uri="http://localhost:8080/tecnico/equipes" label={"Técnicos"} aoAlterado={(event, value) => selectEquipe(event, value)} />
            </div>
        </div>
    )
}