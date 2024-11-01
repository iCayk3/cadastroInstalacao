package br.com.w4solution.controle_instalacao.domain.olt;

import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "ctos")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class Cto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String nomeCto;
    @OneToMany(mappedBy = "cto", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Porta> portas;
    @ManyToOne
    private Olt olt;
    @OneToMany(mappedBy = "ctoRegistro")
    private List<Registro> registros;


    @Override
    public String toString() {
        return "nomeCto='" + nomeCto;
    }
}
