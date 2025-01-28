package br.com.w4solution.controle_instalacao.repository.equipeTecnica;

import br.com.w4solution.controle_instalacao.domain.tecnico.Tecnico;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {

}
