package br.com.w4solution.controle_instalacao.dto.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Cto;

public record CtoDTO(Long id, String nome, Integer portas) {
    public CtoDTO(Cto cto){
        this(cto.getId(), cto.getNomeCto(), cto.getPortas().size());
    }
}
