package br.com.w4solution.controle_instalacao.repository.equipeTecnica;

import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipeTecnicaRepository extends JpaRepository<EquipeTecnica, Long> {
}
