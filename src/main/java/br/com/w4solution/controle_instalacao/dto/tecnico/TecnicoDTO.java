package br.com.w4solution.controle_instalacao.dto.tecnico;

import br.com.w4solution.controle_instalacao.domain.tecnico.Tecnico;

public record TecnicoDTO(Long id, String nome) {
    public TecnicoDTO(Tecnico dados){
        this(dados.getId(), dados.getNome());
    }
}
