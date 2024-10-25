package br.com.w4solution.controle_instalacao.repository.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Cto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CtoRepository extends JpaRepository<Cto, Long> {
}
