package br.com.w4solution.controle_instalacao.dto.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CadastroCTO(@NotNull Long idOlt, @NotBlank String nomeCto, @NotNull Integer portas) {
}
