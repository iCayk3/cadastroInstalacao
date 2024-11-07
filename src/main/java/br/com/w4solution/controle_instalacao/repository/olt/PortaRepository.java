package br.com.w4solution.controle_instalacao.repository.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PortaRepository extends JpaRepository<Porta, Long> {
    @Query("SELECT p FROM Porta p LEFT JOIN FETCH p.clientes WHERE p.cto.id = :ctoId ORDER BY p.porta")
    List<Porta> findPortasByCtoIdWithClientes(@Param("ctoId") Long ctoId);

    @Modifying
    @Transactional
    @Query("UPDATE Porta p SET p.clientes = null WHERE p.id = :id")
    int removeClienteFromPorta(@Param("id") Long id);
}
