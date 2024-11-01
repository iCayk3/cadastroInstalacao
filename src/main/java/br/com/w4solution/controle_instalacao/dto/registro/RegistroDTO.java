package br.com.w4solution.controle_instalacao.dto.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Registro;

import java.time.LocalDate;

public record RegistroDTO(Integer codigo, String nomeCto, Integer porta, String nomeOlt, String nomeEquipeTecnica, LocalDate data, String procedimento, String ctoAntiga, String localidade) {

}
