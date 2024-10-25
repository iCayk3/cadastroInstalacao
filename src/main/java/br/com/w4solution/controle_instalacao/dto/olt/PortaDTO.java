package br.com.w4solution.controle_instalacao.dto.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Cto;
import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import br.com.w4solution.controle_instalacao.domain.olt.Porta;

import java.util.List;

public record PortaDTO(Long oltId, Integer numeroCto, Integer numeroPorta, Integer codigoCLiente) {
}
