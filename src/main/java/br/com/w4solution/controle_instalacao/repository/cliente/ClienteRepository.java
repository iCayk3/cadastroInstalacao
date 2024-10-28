package br.com.w4solution.controle_instalacao.repository.cliente;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
