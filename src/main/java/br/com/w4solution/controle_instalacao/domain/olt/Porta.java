package br.com.w4solution.controle_instalacao.domain.olt;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "portas")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Setter
@Getter
public class Porta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer porta;

    @OneToOne(mappedBy = "portaCliente", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "portaCliente")
    private Cliente clientes;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Cto cto;

    public Porta(Porta p, Cto cto) {
        this.porta = p.porta;
        this.cto = cto;
    }

    @Override
    public String toString() {
        return "porta: " + porta + " cliente: " + clientes;
    }
}
