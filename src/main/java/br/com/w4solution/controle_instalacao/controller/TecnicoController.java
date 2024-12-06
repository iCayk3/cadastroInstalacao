package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import br.com.w4solution.controle_instalacao.dto.tecnico.CadastroEquipeDTO;
import br.com.w4solution.controle_instalacao.dto.tecnico.EquipeDTO;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

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
    @PostMapping("/equipes")
    public ResponseEntity<EquipeDTO> cadastrarEquie(@RequestBody CadastroEquipeDTO dados, UriComponentsBuilder uri){
        var equipe = new EquipeTecnica(null, dados.nomeEquipe(), null, null);
        equipeTecnicaRepository.save(equipe);
        var equipeCriada = uri.path("tecnico/equipes/{id}").buildAndExpand(equipe.getId()).toUri();
        return ResponseEntity.created(equipeCriada).body(new EquipeDTO(equipe));
    }
}
