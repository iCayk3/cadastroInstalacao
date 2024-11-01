package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import br.com.w4solution.controle_instalacao.dto.registro.CadastroRegistroDTO;
import br.com.w4solution.controle_instalacao.dto.registro.RegistroDTO;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import br.com.w4solution.controle_instalacao.repository.registro.RegistroRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("registros")
public class RegistroController {

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    OltRepository oltRepository;

    @Autowired
    PortaRepository portaRepository;

    @Autowired
    EquipeTecnicaRepository equipeTecnicaRepository;

    @Autowired
    RegistroRepository registroRepository;

    @Autowired
    CtoRepository ctoRepository;

    @GetMapping
    public ResponseEntity<List<RegistroDTO>> listarRegistro(@PageableDefault(size = 8) Pageable paginacao){
        var registros = registroRepository.findAll().stream().map(r -> {
            return new RegistroDTO(r.getCliente().getCodigo(), r.getOlt().getNome(), r.getCtoRegistro().getNomeCto(),
                    r.getPorta().getPorta(), r.getEquipeTecnica().getNomeEquipe(), r.getData().toLocalDate(), r.getProcedimento().toString(),
                    r.getCtoAntiga(), r.getLocalidade());
        }).toList();

        return ResponseEntity.ok(registros);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<RegistroDTO> cadastroRegistro(@RequestBody CadastroRegistroDTO dados){
        Cliente cliente = null;
        System.out.println(dados.codigo());
        var buscaPorta = portaRepository.findById(dados.porta());
        var buscaCliente = clienteRepository.findByCodigo(dados.codigo());
        cliente = buscaCliente.orElseGet(() -> {
            return new Cliente(null, "Nome", dados.codigo(), buscaPorta.get(), null);
        });
        var buscaOlt = oltRepository.findById(dados.olt()).get();
        var buscaCto = ctoRepository.findById(dados.cto()).get();
        var equipeTecnica = equipeTecnicaRepository.findById(dados.tecnico()).get();
        var registro = new Registro(null, cliente, buscaOlt, buscaCto, buscaPorta.get(), equipeTecnica, dados.dataregistro(), dados.procedimento(), dados.ctoAntiga(), dados.localidade());

        registroRepository.save(registro);

        return ResponseEntity.ok().build();
    }
}
