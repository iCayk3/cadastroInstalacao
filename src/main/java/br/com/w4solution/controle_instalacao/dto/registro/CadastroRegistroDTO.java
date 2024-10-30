package br.com.w4solution.controle_instalacao.dto.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;

import java.time.LocalDateTime;

public record CadastroRegistroDTO(Long idCliente, Long idOlt, Long idEquipeTecnica, LocalDateTime data, Procedimento procedimento, String ctoAntiga, String localidade) {
}
