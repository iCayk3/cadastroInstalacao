package br.com.w4solution.controle_instalacao.dto.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Cto;
import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import br.com.w4solution.controle_instalacao.domain.olt.Porta;

import java.util.List;

public record CtoDTO(Long id, String nomeCto, List<Porta> portas, Olt olt) {
    public CtoDTO(Cto cto){
        this(cto.getId(), cto.getNomeCto(), cto.getPortas(), cto.getOlt());
    }
}
