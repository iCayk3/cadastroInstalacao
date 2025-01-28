package br.com.w4solution.controle_instalacao.dto.tecnico;

import jakarta.validation.constraints.NotBlank;

public record CadastroEquipeDTO(@NotBlank String nomeEquipe) {
}
