package br.com.w4solution.controle_instalacao.dto.registro;

import java.util.List;

public record ServicosPorEquipeMensal(String nome, List<ServicosEquipe> servicos) {
}
