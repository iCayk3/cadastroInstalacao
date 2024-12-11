import './inputTextApp.css'

const InputTextApp = ({label, onSelectChange, valor, obrigatorio, nome}) => {

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        onSelectChange(selectedValue, e.target.name);
    };

    return (
        <div className='input-text-app'>
            <label>{label}</label>
            <input onChange={handleChange} type='text' placeholder={label} value={valor} required={obrigatorio} name={nome}/>            
        </div>
    )
}

export default InputTextApp