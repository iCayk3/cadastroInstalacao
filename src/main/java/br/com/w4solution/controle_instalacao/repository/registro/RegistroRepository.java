package br.com.w4solution.controle_instalacao.repository.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
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


    List<Registro> findAllByOrderByIdDesc();
    @Query("SELECT r.procedimento, COUNT(r) " +
            "FROM Registro r " +
            "WHERE r.equipeTecnica.id = :equipeTecnicaId " +
            "AND EXTRACT(MONTH FROM r.data) = :mes " +
            "AND EXTRACT(YEAR FROM r.data) = :ano " +
            "GROUP BY r.procedimento")
    List<Object[]> EncontrarRegistroMensalPorTecnico(Long equipeTecnicaId, int mes, int ano);

    @Query("SELECT r FROM Registro r  WHERE r.equipeTecnica.id = :equipeTecnicaId")
    List<Registro> encontrarRegistroPorEquipe(Long equipeTecnicaId);

    @Query("SELECT r FROM Registro r WHERE EXTRACT(MONTH FROM r.data) = :monthValue AND EXTRACT(YEAR FROM r.data) = :year")
    List<Registro> encontrarPorData(int monthValue, int year);
}
