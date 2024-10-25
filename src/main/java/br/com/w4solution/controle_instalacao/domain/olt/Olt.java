package br.com.w4solution.controle_instalacao.domain.olt;

import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import br.com.w4solution.controle_instalacao.dto.olt.CadastroOlt;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "olts")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
public class Olt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    @OneToMany(mappedBy = "olt", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Cto> cto;
    @OneToMany(mappedBy = "olt")
    private List<Registro> registros;

    public Olt(CadastroOlt dados){
        this.nome = dados.nome();
    }
}
