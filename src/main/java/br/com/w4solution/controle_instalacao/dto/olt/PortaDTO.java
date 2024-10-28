package br.com.w4solution.controle_instalacao.dto.olt;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.olt.Porta;

import java.util.List;

public record PortaDTO(Long portaId, Integer numeroPorta, Cliente cliente) {
    public PortaDTO(Porta dados) {
        this(dados.getId(), dados.getPorta(), dados.getClientes());
    }
}
