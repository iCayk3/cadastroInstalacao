package br.com.w4solution.controle_instalacao.dto.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Porta;

import java.util.List;

public record cadastroCTO(Long idOlt, String nomeCto, List<Porta> portas) {
}
