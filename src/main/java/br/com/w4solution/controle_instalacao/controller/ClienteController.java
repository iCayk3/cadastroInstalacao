package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.dto.cliente.AtualizarClienteDTO;
import br.com.w4solution.controle_instalacao.dto.cliente.ClienteCadastroDTO;
import br.com.w4solution.controle_instalacao.dto.cliente.ClienteDTO;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import br.com.w4solution.controle_instalacao.services.ClienteService;
import br.com.w4solution.controle_instalacao.validations.ValidacoesClientesExceptions;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("clientes")
public class ClienteController {

    @Autowired
    ClienteService service;

    @PostMapping
    @Transactional
    ResponseEntity<ClienteDTO> cadastrarCliente(@RequestBody @Valid ClienteCadastroDTO dados, UriComponentsBuilder uri){
        var cliente = service.cadastrarCliente(dados);
        var clienteCriado = uri.path("cliente/{id}").buildAndExpand(cliente.getId()).toUri();
        return ResponseEntity.created(clienteCriado).body(new ClienteDTO(cliente));
    }

    @PutMapping
    @Transactional
    ResponseEntity<ClienteDTO> atualizarCliente(@RequestBody AtualizarClienteDTO dados){
        try {
            var cliente = service.atualizarCliente(dados);
            return ResponseEntity.ok().body(cliente);
        }catch (ValidacoesClientesExceptions e){
            return ResponseEntity.badRequest().build();
        }
    }
}
