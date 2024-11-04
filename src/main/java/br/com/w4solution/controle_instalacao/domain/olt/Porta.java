package br.com.w4solution.controle_instalacao.domain.olt;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente clientes;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cto_id")
    private Cto cto;

    @OneToMany(mappedBy = "porta")
    private List<Registro> registros;

    public Porta(Porta p, Cto cto) {
        this.porta = p.porta;
        this.cto = cto;
    }

    @Override
    public String toString() {
        return "porta: " + porta + " cliente: " + clientes;
    }
}
