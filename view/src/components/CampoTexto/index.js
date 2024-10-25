import './CampoTexto.css'

const CampoTexto = (props) => {
    return (
        <div className='campo-texto'>
            <label>{props.nome}</label>
            <input type='text' placeholder={props.nome}/>
        </div>
    )
}

export default CampoTexto