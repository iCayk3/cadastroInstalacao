package br.com.w4solution.controle_instalacao.domain.tecnico;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tecnicos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Tecnico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    private String nome;
    @ManyToOne
    private EquipeTecnica equipeTecnica;

    public Tecnico(String nome) {
        this.nome = nome;
    }
}
