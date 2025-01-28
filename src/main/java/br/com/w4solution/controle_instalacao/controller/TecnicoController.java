package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import br.com.w4solution.controle_instalacao.dto.AtualizarEquipeDTO;
import br.com.w4solution.controle_instalacao.dto.tecnico.CadastroEquipeDTO;
import br.com.w4solution.controle_instalacao.dto.tecnico.EquipeComTecnicoDTO;
import br.com.w4solution.controle_instalacao.dto.tecnico.EquipeDTO;
import br.com.w4solution.controle_instalacao.dto.tecnico.cadastrarTecnicoDTO;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import br.com.w4solution.controle_instalacao.services.TecnicoService;
import br.com.w4solution.controle_instalacao.validations.AtualizarEquipeException;
import br.com.w4solution.controle_instalacao.validations.exceptions.CadastrarTecnicoException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
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
    @Autowired
    TecnicoService service;

    @GetMapping("/equipes")
    public ResponseEntity<List<EquipeDTO>> listarEquipe(){
        var tecnicos = service.listarEquipes();
        return ResponseEntity.ok(tecnicos);
    }

    @GetMapping
    public ResponseEntity<List<EquipeComTecnicoDTO>> listarTecnicosPorEquipe(){
        var equipes = service.listarTecnicoPorEquipe();
        return ResponseEntity.ok().body(equipes);
    }

    @PostMapping("/equipes")
    @Transactional
    public ResponseEntity<EquipeDTO> cadastrarEquipe(@RequestBody @Valid CadastroEquipeDTO dados, UriComponentsBuilder uri){
        var equipe = service.cadastrarEquipeTecnica(dados);
        var equipeCriada = uri.path("tecnico/equipes/{id}").buildAndExpand(equipe.getId()).toUri();
        return ResponseEntity.created(equipeCriada).body(new EquipeDTO(equipe));
    }
    @PutMapping("/equipes")
    @Transactional
    public ResponseEntity<EquipeDTO> atualizarEquipe(@RequestBody @Valid AtualizarEquipeDTO dados, UriComponentsBuilder uri){
        try{
            service.atualizarEquipeTecnica(dados);
            return ResponseEntity.ok().build();
        }catch (AtualizarEquipeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Transactional
    public ResponseEntity cadastrarTecnico(@RequestBody @Valid cadastrarTecnicoDTO dados, UriComponentsBuilder uri){
        try{
            var tecnicoDto = service.cadastrarTecnico(dados);
            return ResponseEntity.ok().body(tecnicoDto);
        }catch (CadastrarTecnicoException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


}
