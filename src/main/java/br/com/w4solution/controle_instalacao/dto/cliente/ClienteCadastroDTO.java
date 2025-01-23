package br.com.w4solution.controle_instalacao.dto.cliente;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClienteCadastroDTO(@NotBlank String nome, @NotNull Integer codigo) {
}
