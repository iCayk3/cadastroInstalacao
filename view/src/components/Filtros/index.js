import BasicDatePicker from "../BasicDatePicker";
import FieldAutoComplet from "../FieldAutoComplet";
import styles from './Filtros.module.css'
import FloatingLabelInput from "../FloatingLabelInput";



export default function Filtros({aoAlteradoTecnico, aoAlteradoData, aoAlteradoCliente}) {

    const apiUrl = process.env.REACT_APP_API_URL;

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

    function selectCliente(value){
        if(value === null){
            aoAlteradoCliente('')
        }else {
            aoAlteradoCliente(value)
        }
    }

    return (
        <div className={styles.filtroContainer}>
            <h3 className={styles.gridItem}>Filtros</h3>
            <div className={styles.gridItem}>
                <FloatingLabelInput 
                    labelProp={"Código"} 
                    placeholderProp={"Informé o código para pesquisa"} 
                    sx={{ '--Input-minHeight': '56px', '--Input-radius': '6px' }}
                    aoAlterado={(value) => selectCliente(value)}
                />
            </div>
            <div className={styles.gridItem}>
                <BasicDatePicker aoAlterado={(value) => selectData(value)} label={"Selecione a data"}/>
            </div>
            <div className={styles.gridItem}>
                <FieldAutoComplet uri={`${apiUrl}/tecnico/equipes`} label={"Técnicos"} aoAlterado={(event, value) => selectEquipe(event, value)} />
            </div>
        </div>
    )
}