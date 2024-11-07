package br.com.w4solution.controle_instalacao.repository.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RegistroRepository extends JpaRepository<Registro, Long> {


    List<Registro> findTop5ByOrderByIdDesc();

    @Query("SELECT COUNT(r) " +
            "FROM Registro r " +
            "WHERE r.procedimento = :procedimento " +
            "AND EXTRACT(MONTH FROM r.data) = :mes " +
            "AND EXTRACT(YEAR FROM r.data) = :ano " +
            "GROUP BY EXTRACT(MONTH FROM r.data), EXTRACT(YEAR FROM r.data) " +
            "ORDER BY COUNT(r) DESC")
    Integer buscarResumoMensal(Procedimento procedimento, Integer mes, Integer ano);
}
