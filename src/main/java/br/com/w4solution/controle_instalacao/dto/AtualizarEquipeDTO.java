package br.com.w4solution.controle_instalacao.dto;

import jakarta.validation.constraints.NotNull;

public record AtualizarEquipeDTO(@NotNull Long id, String equipe) {
}
