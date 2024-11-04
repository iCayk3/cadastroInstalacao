package br.com.w4solution.controle_instalacao.repository.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PortaRepository extends JpaRepository<Porta, Long> {
    @Query("SELECT p FROM Porta p LEFT JOIN FETCH p.clientes WHERE p.cto.id = :ctoId ORDER BY p.porta")
    List<Porta> findPortasByCtoIdWithClientes(@Param("ctoId") Long ctoId);
}
