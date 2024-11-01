package br.com.w4solution.controle_instalacao.dto.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;

import java.time.LocalDateTime;

public record CadastroRegistroDTO(Integer codigo, Long olt, Long porta, Long cto, Long tecnico, String dataregistro, Procedimento procedimento, String ctoAntiga, String localidade) {
}
