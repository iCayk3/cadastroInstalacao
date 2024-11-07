package br.com.w4solution.controle_instalacao.domain.cliente;


import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    @Column(unique = true)
    private Integer codigo;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "porta_id", referencedColumnName = "id")
    private Porta portaCliente;

    @OneToMany(mappedBy = "cliente")
    private List<Registro> registros;

    public Cliente(Integer codigo){
        this.codigo = codigo;
    }

    public void atualizarCliente(String nome, Porta porta){
        if(nome != null){
            this.nome = nome;
        }
        if(porta != null){
            this.portaCliente = porta;
        }
    }

    @Override
    public String toString() {
        return "Cliente: " + nome;
    }
}
