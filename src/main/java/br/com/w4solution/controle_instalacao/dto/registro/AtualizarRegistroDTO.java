package br.com.w4solution.controle_instalacao.dto.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;

public record AtualizarRegistroDTO(Long id, Integer codigo, Long nomeOlt, Long porta, Long nomeCto, Long nomeEquipeTecnica, String data, Procedimento procedimento, String ctoAntiga, String localidade, String observacao) {
    public AtualizarRegistroDTO(String id, String codigo, String nomeOlt, String porta, String nomeCto, String nomeEquipeTecnica, String data, Procedimento procedimento, String ctoAntiga, String localidade, String observacao){
        this(   Long.parseLong(id),
                Integer.parseInt(codigo),
                Long.parseLong(nomeOlt),
                Long.parseLong(porta),
                Long.parseLong(nomeCto),
                Long.parseLong(nomeEquipeTecnica),
                data,
                procedimento,
                ctoAntiga,
                localidade,
                observacao
                );
    }
    public AtualizarRegistroDTO(Long id, String codigo, String nomeOlt, String porta, String nomeCto, String nomeEquipeTecnica, String data, Procedimento procedimento, String ctoAntiga, String localidade, String observacao){
        this(   id,
                Integer.parseInt(codigo),
                Long.parseLong(nomeOlt),
                Long.parseLong(porta),
                Long.parseLong(nomeCto),
                Long.parseLong(nomeEquipeTecnica),
                data,
                procedimento,
                ctoAntiga,
                localidade,
                observacao
        );
    }
    public AtualizarRegistroDTO(Long id, String codigo, String nomeEquipeTecnica, String data, Procedimento procedimento, String ctoAntiga, String localidade, String observacao){
        this(   id,
                Integer.parseInt(codigo),
                null,
                null,
                null,
                Long.parseLong(nomeEquipeTecnica),
                data,
                procedimento,
                ctoAntiga,
                localidade,
                observacao
        );
    }
}
