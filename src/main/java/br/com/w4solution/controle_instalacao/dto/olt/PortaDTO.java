package br.com.w4solution.controle_instalacao.dto.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Porta;

public record PortaDTO(Long idPorta, Integer numeroPorta, String nomeCliente) {
    public PortaDTO(Porta dados) {
        this(dados.getId(), dados.getPorta(), dados.getClientes().getNome());
    }
}
