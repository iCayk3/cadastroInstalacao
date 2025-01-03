package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.olt.Cto;
import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import br.com.w4solution.controle_instalacao.dto.olt.*;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.beans.Transient;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("olt")
public class OltController {
    @Autowired
    OltRepository repository;

    @Autowired
    CtoRepository repositoryCto;

    @Autowired
    PortaRepository repositoryPorta;

    @Autowired
    ClienteRepository repositoryCliente;

    @GetMapping
    public ResponseEntity<List<OltDTO>> listarOlts(){
        var olts = repository.findAll().stream().map(OltDTO::new).toList();
        return ResponseEntity.ok(olts);
    }

    @GetMapping("{id}/cto")
    public ResponseEntity<List<CtoDTO>> listarCtos(@PathVariable Long id){
        var olt = repository.findById(id);
        if(olt.isPresent()){
            var ctos = olt.get().getCto().stream().map(CtoDTO::new).toList();
            return ResponseEntity.ok(ctos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/cto/{id}/portas")
    public ResponseEntity<List<PortaDTO>> listarPortas(@PathVariable Long id){
        var portas = repositoryPorta.findPortasByCtoIdWithClientes(id);

        var portasEncontrada = portas.stream().map(p -> {
            if(p.getClientes() != null){
                return new PortaDTO(p.getId(), p.getPorta(), p.getClientes().getCodigo());
            }else {
                return new PortaDTO(p.getId(), p.getPorta(), null);
            }
        }).toList();

        return ResponseEntity.ok(portasEncontrada);
    }

    @PostMapping
    @Transient
    public ResponseEntity<OltDTO> cadastrarOlt(@RequestBody CadastroOlt cadastroOlt, UriComponentsBuilder uri){

        var olt = new Olt(cadastroOlt);

        repository.save(olt);
        var oltCriada = uri.path("/olt/{id}").buildAndExpand(olt.getId()).toUri();

        return ResponseEntity.created(oltCriada).body(new OltDTO(olt));
    }

    @PostMapping("/cto")
    @Transient
    public  ResponseEntity<CtoDTO> cadastrarCTO(@RequestBody cadastroCTO dados, UriComponentsBuilder uri){
        var olt = repository.findById(dados.idOlt());
        List<Porta> portas = null;
        var portasDados = dados.portas();
        var cto = new Cto(null, dados.nomeCto(), null, olt.get(), null);

        portas = portasDados.stream().map(p -> new Porta(p, cto)).collect(Collectors.toList());

        portas.forEach(System.out::println);

        cto.setPortas(portas);

        if(olt.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        repositoryCto.save(cto);

        var oltCriada = uri.path("/olt/cto/{id}").buildAndExpand(cto.getId()).toUri();

        return ResponseEntity.created(oltCriada).body(new CtoDTO(cto));

    }

    @PutMapping("/cto/portas")
    @Transactional
    public ResponseEntity<PortaDTO> atualizarPorta(@RequestBody AtualizarPortaDTO dados){
        Cliente cliente = new Cliente();
        cliente.setNome(dados.nomeCliente());
        System.out.println(cliente);
        var porta = repositoryPorta.findById(dados.portaId());
        if(porta.isPresent()){
            var portaEncontrada = porta.get();
            cliente.setPortaCliente(porta.get());
            return ResponseEntity.ok(new PortaDTO(portaEncontrada.getId(), portaEncontrada.getPorta(), portaEncontrada.getClientes().getCodigo()));
        }

        return ResponseEntity.notFound().build();
    }


}
