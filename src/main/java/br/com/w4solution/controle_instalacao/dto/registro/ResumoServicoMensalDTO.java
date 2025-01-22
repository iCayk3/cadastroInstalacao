package br.com.w4solution.controle_instalacao.dto.registro;

public record ResumoServicoMensalDTO(Integer instalacao, Integer mudancaEndereco, Integer trocaEquipamento,
                                     Integer cancelamento, Integer reativacao, Integer migracao, Integer semInternet, Integer lentidao, Integer mudancaComodo,
                                    Integer trocaSenha, Integer outros) {
}
