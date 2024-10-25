package br.com.w4solution.controle_instalacao.repository.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OltRepository extends JpaRepository<Olt, Long> {

}
