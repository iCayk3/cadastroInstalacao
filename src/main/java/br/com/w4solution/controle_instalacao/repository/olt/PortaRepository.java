package br.com.w4solution.controle_instalacao.repository.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortaRepository extends JpaRepository<Porta, Long> {
}
