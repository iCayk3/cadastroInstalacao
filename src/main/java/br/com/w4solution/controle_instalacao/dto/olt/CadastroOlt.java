package br.com.w4solution.controle_instalacao.dto.olt;

import jakarta.validation.constraints.NotBlank;

public record CadastroOlt(
        @NotBlank String nome
) {
}
