import useFetch from "../../Services/useFetch";
import './selectApp.css'


const SelectApp = ({ label, uri, onSelectChange, valor }) => {

    const { data, loading, error } = useFetch(uri);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        onSelectChange(selectedValue);
    };

    return (
        <div className="select-app">
            <label>{label}</label>

            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            {data && (
                <select
                    value={valor}
                    onChange={handleChange}
                >
                    <option value=""></option>

                    {data.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.codigo ? `${item.nome}: ${item.codigo}` : item.nome}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default SelectApp