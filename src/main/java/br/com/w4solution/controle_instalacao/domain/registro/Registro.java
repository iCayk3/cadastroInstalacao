package br.com.w4solution.controle_instalacao.domain.registro;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.olt.Cto;
import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import br.com.w4solution.controle_instalacao.dto.registro.AtualizarRegistroDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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
    private Cto ctoRegistro;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Porta porta;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private EquipeTecnica equipeTecnica;
    private LocalDateTime data;
    @Enumerated(EnumType.STRING)
    private Procedimento procedimento;
    private String ctoAntiga;
    private String localidade;
    private String observacao;

    public Registro(Long id, Cliente cliente, Olt buscaOlt, Cto cto, Porta porta, EquipeTecnica equipeTecnica, String data, Procedimento procedimento, String ctoAntiga, String localidade, String observacao) {
        this.cliente = cliente;
        this.olt = buscaOlt;
        this.equipeTecnica = equipeTecnica;
        this.data = converterParaData(data);
        this.procedimento = procedimento;
        this.ctoAntiga = ctoAntiga;
        this.localidade = localidade;
        this.ctoRegistro = cto;
        this.porta = porta;
        this.observacao = observacao;
    }

    public Registro(Cliente cliente, EquipeTecnica equipeTecnica, String data, Procedimento procedimento, String ctoAntiga, String localidade, String observacao) {
        this.cliente = cliente;
        this.equipeTecnica = equipeTecnica;
        this.data = converterParaData(data);
        this.procedimento = procedimento;
        this.ctoAntiga = ctoAntiga;
        this.localidade = localidade;
        this.observacao = observacao;
    }

    private LocalDateTime converterParaData(String data){

        if(data == null){
            var dataParaConversao = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            return LocalDateTime.parse(dataParaConversao + " 00:00:00", formatter);
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(data + " 00:00:00", formatter);
    }

    public void setData(String data){
        this.data = converterParaData(data);
    }


}
