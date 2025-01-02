import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useFetch from '../../Services/useFetch';


export default function FieldAutoComplet({ uri, label, aoAlterado, dadosProcedimento, desabilitar, porta, obrigatorio, valor, inputValue, onInputValueChange }) {

    const { data, loading, error } = useFetch(uri)


    return (
        <>
            {!porta && !desabilitar && !dadosProcedimento && error && <p>Erro na solitação</p>}
            {!porta && !desabilitar && !dadosProcedimento && loading && <p>Carregando</p>}
            {!porta && !desabilitar && !dadosProcedimento && data &&
                <Autocomplete
                    value={valor}
                    inputValue={inputValue}
                    onChange={(evento, novoValor) => aoAlterado(novoValor)}
                    onInputChange={(event, novoInput) => onInputValueChange(novoInput)}
                    options={data}
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    disablePortal
                    sx={{ backgroundColor: "white" }}
                    renderInput={(params) => <TextField {...params} required={obrigatorio} label={label} />}
                />
            }
            {
                !porta && dadosProcedimento && !uri &&
                <Autocomplete
                    value={valor}
                    inputValue={inputValue}
                    onChange={(evento, novoValor) => aoAlterado(novoValor)}
                    onInputChange={(event, novoInput) => onInputValueChange(novoInput)}
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    disablePortal
                    options={dadosProcedimento}
                    sx={{ backgroundColor: "white"  }}
                    renderInput={(params) => <TextField {...params} required={obrigatorio} label={label} />}
                />}
            {
                !porta && desabilitar && !dadosProcedimento && !uri &&
                <Autocomplete
                    aria-required={obrigatorio}
                    disabled={desabilitar}
                    disablePortal
                    options={[{ data: "data" }]}
                    renderInput={(params) => <TextField {...params} label={label} />}
                />}
            {porta && !desabilitar && !dadosProcedimento && error && <p>Erro na solitação</p>}
            {porta && !desabilitar && !dadosProcedimento && loading && <p>Carregando</p>}
            {data &&
                !desabilitar && !dadosProcedimento && porta &&
                <Autocomplete
                    value={valor}
                    inputValue={inputValue}
                    onChange={(evento, novoValor) => aoAlterado(novoValor)}
                    onInputChange={(event, novoInput) => onInputValueChange(novoInput)}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    disablePortal
                    options={data}
                    sx={{ backgroundColor: "white"  }}
                    getOptionLabel={(option) => `${option && option.label}: ${option && option.codigo}`}
                    renderInput={(params) => <TextField {...params} required={obrigatorio} label={label} />}
                />
            }
        </>
    );
}   