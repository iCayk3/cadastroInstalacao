package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.dto.cliente.AtualizarClienteDTO;
import br.com.w4solution.controle_instalacao.dto.cliente.ClienteCadastroDTO;
import br.com.w4solution.controle_instalacao.dto.cliente.ClienteDTO;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("clientes")
public class ClienteController {

    @Autowired
    ClienteRepository repository;

    @Autowired
    PortaRepository portaRepository;

    @PostMapping
    ResponseEntity<ClienteDTO> cadastrarCliente(@RequestBody ClienteCadastroDTO dados, UriComponentsBuilder uri){
        var cliente = new Cliente(null, dados.nome(), null);
        repository.save(cliente);
        var clienteCriado = uri.path("cliente/{id}").buildAndExpand(cliente.getId()).toUri();
        return ResponseEntity.created(clienteCriado).body(new ClienteDTO(cliente));
    }

    @PutMapping
    @Transactional
    ResponseEntity<ClienteDTO> atualizarCliente(@RequestBody AtualizarClienteDTO dados){

        var cliente = repository.findById(dados.id());
        var porta = portaRepository.findById(dados.idPorta());
        if(cliente.isPresent() && porta.isPresent()){
            cliente.get().atualizarCliente(dados.nome(), porta.get());
            return ResponseEntity.ok(new ClienteDTO(cliente.get()));
        }

        return ResponseEntity.notFound().build();
    }
}
