package br.com.w4solution.controle_instalacao.dto.tecnico;

import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import br.com.w4solution.controle_instalacao.domain.tecnico.Tecnico;

import java.util.List;

public record EquipeComTecnicoDTO(Long id, String label, List<TecnicoDTO> tecnicos) {

}
