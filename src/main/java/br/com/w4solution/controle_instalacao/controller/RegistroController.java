package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.dto.registro.CadastroRegistroDTO;
import br.com.w4solution.controle_instalacao.dto.registro.RegistroDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("registros")
public class RegistroController {

    @PostMapping
    public ResponseEntity<RegistroDTO> cadastroRegistro(CadastroRegistroDTO dados){

        return ResponseEntity.ok().build();
    }
}
