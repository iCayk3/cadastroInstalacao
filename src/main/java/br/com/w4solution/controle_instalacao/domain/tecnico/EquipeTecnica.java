package br.com.w4solution.controle_instalacao.domain.tecnico;

import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
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
