package br.com.w4solution.controle_instalacao.repository.equipeTecnica;

import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EquipeTecnicaRepository extends JpaRepository<EquipeTecnica, Long> {
    @Query("SELECT e FROM EquipeTecnica e JOIN FETCH e.tecnicos t ORDER BY e.nomeEquipe, t.nome")
    List<EquipeTecnica> findAllWithTecnicos();
}
