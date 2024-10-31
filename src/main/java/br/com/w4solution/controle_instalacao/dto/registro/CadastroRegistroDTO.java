package br.com.w4solution.controle_instalacao.dto.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;

import java.time.LocalDateTime;

public record CadastroRegistroDTO(Integer codigo, Long idOlt, Long idPorta, Long idEquipeTecnica, String data, Procedimento procedimento, String ctoAntiga, String localidade) {
}
