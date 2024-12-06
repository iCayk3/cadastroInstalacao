package br.com.w4solution.controle_instalacao.dto.tecnico;

import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import org.springframework.data.jpa.repository.JpaRepository;

public record EquipeDTO(Long id, String nome) {
    public EquipeDTO(EquipeTecnica equipe) {
        this(equipe.getId(), equipe.getNomeEquipe());
    }
}
