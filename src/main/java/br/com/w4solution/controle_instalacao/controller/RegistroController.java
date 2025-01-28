package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.dto.registro.*;
import br.com.w4solution.controle_instalacao.services.registros.RegistroService;
import br.com.w4solution.controle_instalacao.validations.DeletarRegistroExceptions;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("registros")
public class RegistroController {

    @Autowired
    RegistroService service;

    @GetMapping
    public ResponseEntity<List<RegistroDTO>> listarRegistro(@RequestParam(required = false) Long equipe, @RequestParam(required = false) String filtro){
        var registros = service.listarTodosRegistros(equipe, filtro);
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/servicos/tecnicos/mensal/resumo")
    public ResponseEntity<List<ServicosPorEquipeMensal>> listarServicosPorEquipe(@RequestParam(required = false) String filtro){
        var servicoPoeEquipe = service.listarServicosPorEquipe(filtro);
        return ResponseEntity.ok().body(servicoPoeEquipe);
    }

    @GetMapping("/top5")
    public ResponseEntity<List<RegistroDTO>> listarTodosRegistros(){
        var registros = service.listarTop5Registros();
        return ResponseEntity.ok().body(registros);
    }

    @GetMapping("/servicos/mensais/resumo")
    public ResponseEntity<ResumoServicoMensalDTO> listarResumoMensal(@RequestParam(required = false) String filtro){
        var resumo = service.resumoMensal(filtro);
        return ResponseEntity.ok(resumo);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<RegistroDTO> cadastroRegistro(@RequestBody CadastroRegistroDTO dados, UriComponentsBuilder uri){

        var registro = service.cadastrarRegistro(dados);
        var uriRegistro = uri.path("/{id}").buildAndExpand(registro.getId()).toUri();
        return ResponseEntity.created(uriRegistro).body(new RegistroDTO(registro));

    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizarRegistro(@RequestBody AtualizarRegistroDTO dados){
        service.atualizarRegistro(dados);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletarRegistro(@PathVariable Long id){
        try{
            service.deletarRegistro(id);
            return ResponseEntity.ok().build();
        }catch (DeletarRegistroExceptions e){
            return ResponseEntity.notFound().build();
        }
    }
}
