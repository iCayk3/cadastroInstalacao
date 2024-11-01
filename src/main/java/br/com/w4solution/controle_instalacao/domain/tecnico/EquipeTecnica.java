package br.com.w4solution.controle_instalacao.domain.tecnico;

import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class EquipeTecnica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nomeEquipe;
    @OneToMany(mappedBy = "equipeTecnica", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Tecnico> tecnicos;
    @OneToMany(mappedBy = "equipeTecnica")
    private List<Registro> registro;
}
