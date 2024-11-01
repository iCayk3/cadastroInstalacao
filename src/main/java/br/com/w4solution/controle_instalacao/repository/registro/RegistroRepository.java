package br.com.w4solution.controle_instalacao.repository.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface RegistroRepository extends JpaRepository<Registro, Long> {


    List<Registro> findTop5ByOrderByIdDesc();

}
