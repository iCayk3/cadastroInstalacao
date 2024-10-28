package br.com.w4solution.controle_instalacao.dto.cliente;

import br.com.w4solution.controle_instalacao.domain.olt.Porta;

public record AtualizarClienteDTO(Long id, String nome, Long idPorta) {
}
