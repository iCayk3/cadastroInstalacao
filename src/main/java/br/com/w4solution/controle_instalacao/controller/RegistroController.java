package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import br.com.w4solution.controle_instalacao.dto.registro.CadastroRegistroDTO;
import br.com.w4solution.controle_instalacao.dto.registro.RegistroDTO;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("registros")
public class RegistroController {

    @Autowired
    ClienteRepository clienteRepository;

    @PostMapping
    public ResponseEntity<RegistroDTO> cadastroRegistro(CadastroRegistroDTO dados){
        Cliente cliente = null;
        var buscaCliente = clienteRepository.findById(dados.idCliente());
        return ResponseEntity.ok().build();
    }
}
