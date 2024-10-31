package br.com.w4solution.controle_instalacao.repository.cliente;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByCodigo(Integer codigo);
}
