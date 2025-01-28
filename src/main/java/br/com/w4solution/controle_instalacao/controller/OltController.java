package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.dto.olt.*;
import br.com.w4solution.controle_instalacao.services.olt.OltService;
import br.com.w4solution.controle_instalacao.validations.ValidacaoCtoException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("olt")
public class OltController {

    @Autowired
    OltService oltService;

    @GetMapping
    public ResponseEntity<List<OltDTO>> listarOlts(){
        var olts = oltService.listarOlts();
        return ResponseEntity.ok(olts);
    }

    @GetMapping("{id}/cto")
    public ResponseEntity<List<CtoDTO>> listarCtos(@PathVariable Long id){
        try{
            return ResponseEntity.ok(oltService.listarCtos(id));
        }catch (ValidacaoCtoException e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/cto/{id}/portas")
    public ResponseEntity<List<PortaDTO>> listarPortas(@PathVariable Long id){
        var portasEncontrada = oltService.listarPortas(id);
        return ResponseEntity.ok(portasEncontrada);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<OltDTO> cadastrarOlt(@RequestBody @Valid CadastroOlt cadastroOlt, UriComponentsBuilder uri){
        var olt = oltService.cadastrarOlt(cadastroOlt);
        var oltCriada = uri.path("/olt/{id}").buildAndExpand(olt.getId()).toUri();
        return ResponseEntity.created(oltCriada).body(new OltDTO(olt));
    }

    @PostMapping("/cto")
    @Transactional
    public  ResponseEntity<CtoDTO> cadastrarCTO(@RequestBody @Valid CadastroCTO dados, UriComponentsBuilder uri){
        var cto = oltService.cadastrarCto(dados);
        var oltCriada = uri.path("/olt/cto/{id}").buildAndExpand(cto.getId()).toUri();
        return ResponseEntity.created(oltCriada).body(new CtoDTO(cto));
    }


}
