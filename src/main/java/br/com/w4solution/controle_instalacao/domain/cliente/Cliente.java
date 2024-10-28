package br.com.w4solution.controle_instalacao.domain.cliente;


import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer codigo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Porta portaCliente;

    @Override
    public String toString() {
        return "Cliente: " + codigo;
    }
}
