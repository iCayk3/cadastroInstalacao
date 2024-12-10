package br.com.w4solution.controle_instalacao.dto.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Olt;

public record OltDTO(Long id, String label) {
    public OltDTO(Olt dados){
        this(dados.getId(), dados.getNome());
    }
}
