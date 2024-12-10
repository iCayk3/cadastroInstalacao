import { useState } from "react";
import BasicDatePicker from "../BasicDatePicker";
import FieldAutoComplet from "../FieldAutoComplet";
import styles from './Filtros.module.css'



export default function Filtros({aoAlteradoTecnico}) {

    const [equipe, setEquipe] = useState('')

    function selectEquipe(evento, value) {
        if (value === null) {
            console.log('Campo foi limpo!');
        } else {
            aoAlteradoTecnico(value.label)
        }
    }

    return (
        <div className={styles.filtroContainer}>
            <h3 className={styles.gridItem}>Filtros</h3>
            <div className={styles.gridItem}>
                <BasicDatePicker />
            </div>
            <div className={styles.gridItem}>
                <FieldAutoComplet uri="http://localhost:8080/tecnico/equipes" label={"Técnicos"} aoAlterado={(event, value) => selectEquipe(event, value)} />
            </div>
        </div>
    )
}