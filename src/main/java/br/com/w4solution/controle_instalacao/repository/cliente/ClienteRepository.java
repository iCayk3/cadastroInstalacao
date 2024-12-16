package br.com.w4solution.controle_instalacao.repository.cliente;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByCodigo(Integer codigo);

    @Query(value = "SELECT * FROM clientes WHERE porta_id = :porta", nativeQuery = true)
    Optional<Cliente> encontrarClienteComPortaAtiva(Long porta);

    @Modifying
    @Transactional
    @Query(value = "UPDATE clientes SET porta_id = NULL WHERE id = :clienteId", nativeQuery = true)
    void removerPortaDeCliente(Long clienteId);

}
