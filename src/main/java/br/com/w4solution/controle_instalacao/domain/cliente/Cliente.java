package br.com.w4solution.controle_instalacao.domain.cliente;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Cliente {
    private Integer codigo;
}
