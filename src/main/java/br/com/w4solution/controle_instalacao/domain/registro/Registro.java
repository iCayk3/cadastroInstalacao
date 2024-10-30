package br.com.w4solution.controle_instalacao.domain.registro;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "registros")
@AllArgsConstructor
@NoArgsConstructor

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
}
