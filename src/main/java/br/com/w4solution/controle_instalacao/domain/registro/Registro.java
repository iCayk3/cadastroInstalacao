package br.com.w4solution.controle_instalacao.domain.registro;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "registros")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Registro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Cliente cliente;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Olt olt;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private EquipeTecnica equipeTecnica;
    private LocalDateTime data;
    @Enumerated(EnumType.STRING)
    private Procedimento procedimento;
    private String ctoAntiga;
    private String localidade;

    public Registro(Long id, Cliente cliente, Olt buscaOlt, EquipeTecnica equipeTecnica, String data, Procedimento procedimento, String ctoAntiga, String localidade) {
        this.cliente = cliente;
        this.olt = buscaOlt;
        this.equipeTecnica = equipeTecnica;
        this.data = converterParaData(data);
        this.procedimento = procedimento;
        this.ctoAntiga = ctoAntiga;
        this.localidade = localidade;
    }


    private LocalDateTime converterParaData(String data){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(data + " 00:00:00", formatter);
    }


}
