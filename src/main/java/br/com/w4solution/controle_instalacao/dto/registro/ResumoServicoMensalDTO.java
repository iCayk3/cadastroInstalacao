package br.com.w4solution.controle_instalacao.dto.registro;

public record ResumoServicoMensalDTO(Integer instalacao, Integer mudancaEndereco, Integer reparo, Integer trocaEquipamento,
                                     Integer cancelamento, Integer reativacao, Integer migracao) {
}
