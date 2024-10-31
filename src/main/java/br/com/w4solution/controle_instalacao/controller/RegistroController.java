package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.olt.Porta;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping
    @Transactional
    public ResponseEntity<RegistroDTO> cadastroRegistro(@RequestBody CadastroRegistroDTO dados){
        Cliente cliente = null;
        System.out.println(dados.codigo());
        var buscaPorta = portaRepository.findById(dados.idPorta());
        var buscaCliente = clienteRepository.findByCodigo(dados.codigo());
        cliente = buscaCliente.orElseGet(() -> {
            return new Cliente(null, "Nome", dados.codigo(), buscaPorta.get(), null);
        });
        var buscaOlt = oltRepository.findById(dados.idOlt()).get();
        var equipeTecnica = equipeTecnicaRepository.findById(dados.idEquipeTecnica()).get();
        var registro = new Registro(null, cliente, buscaOlt, equipeTecnica, dados.data(), dados.procedimento(), dados.ctoAntiga(), dados.localidade());

        registroRepository.save(registro);

        return ResponseEntity.ok().build();
    }
}
