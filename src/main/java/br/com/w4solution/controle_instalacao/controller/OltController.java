package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.olt.Cto;
import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import br.com.w4solution.controle_instalacao.dto.olt.*;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.beans.Transient;
import java.util.ArrayList;
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
        var cto = new Cto(null, dados.nomeCto(), null, olt.get());
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

    @PostMapping("/cto/cliente")
    @Transient
    public ResponseEntity<CtoDTO> cadastrarClienteNaCto(@RequestBody PortaDTO dados){
        var oltEncontrada = repository.findById(dados.oltId());
        if(oltEncontrada.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        var cliente = new Cliente(dados.codigoCLiente());

        var olt = oltEncontrada.get();

        Cto ctoEncontrada = olt.getCto().get(dados.numeroCto());

        var porta = ctoEncontrada.getPortas().get(dados.numeroPorta() + 1);
        System.out.println(porta);
        porta.setCliente(cliente);

        repositoryPorta.save(porta);

        System.out.println(ctoEncontrada);
        return ResponseEntity.ok().build();
    }

}
