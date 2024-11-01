package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.dto.tecnico.EquipeDTO;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tecnico")
public class TecnicoController {

    @Autowired
    EquipeTecnicaRepository equipeTecnicaRepository;
    @GetMapping("/equipes")
    public ResponseEntity<List<EquipeDTO>> listarEquipe(){
        var equipeTecnica = equipeTecnicaRepository.findAll();
        var tecnicos = equipeTecnica.stream().map(t -> new EquipeDTO(t.getId(), t.getNomeEquipe())).toList();
        return ResponseEntity.ok(tecnicos);
    }
}
