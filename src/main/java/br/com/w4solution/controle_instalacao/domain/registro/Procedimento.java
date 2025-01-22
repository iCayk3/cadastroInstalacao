package br.com.w4solution.controle_instalacao.domain.registro;

public enum Procedimento {
    INSTALACAO("instalacao"),
    MUDANCA_ENDERECO("mudanca de endereco"),
    SEM_INTERNET("sem internet"),
    LENTIDAO("lentidão"),
    MUDANCA_COMODO("mudança de comodo"),
    TROCA_SENHA("troca de senha"),
    OUTROS("outros"),
    REPARO("reparo"),
    TROCA_EQUIPAMENTO("troca de equipamento"),
    CANCELAMENTO("cancelamento"),
    REATIVACAO("reativacao"),
    MIGRACAO("migracao");

    private String procedimento;

    Procedimento (String procedimento){
        this.procedimento = procedimento;
    }
    public static Procedimento fromString(String text) {
        for (Procedimento procedimento : Procedimento.values()) {
            if (procedimento.procedimento.equalsIgnoreCase(text)) {
                return procedimento;
            }
        }
        throw new IllegalArgumentException("Nenhuma categoria encontrada para a string fornecida: " + text);
    }
}
