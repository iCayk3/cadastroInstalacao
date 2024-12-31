package br.com.w4solution.controle_instalacao.services;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import br.com.w4solution.controle_instalacao.dto.registro.CadastroRegistroDTO;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class ValidacoesRegistro {

    @Autowired
    EquipeTecnicaRepository equipeTecnicaRepository;
    @Autowired
    ClienteRepository clienteRepository;
    @Autowired
    PortaRepository portaRepository;
    @Autowired
    OltRepository oltRepository;
    @Autowired
    CtoRepository ctoRepository;


    public Registro validacoesRegistro(CadastroRegistroDTO dados){
        Registro registro;
        Cliente cliente = null;
        var equipeTecnica = equipeTecnicaRepository.findById(dados.tecnico());
        if(equipeTecnica.isEmpty()){
            throw new RuntimeException("Tecnico não enviado");
        }

        if (dados.olt() == null) {
            var buscaCliente = clienteRepository.findByCodigo(dados.codigo());
            cliente = buscaCliente.orElseGet(() -> {
                return new Cliente(dados.codigo());
            });
            registro = new Registro(cliente, equipeTecnica.get(), dados.dataregistro(), dados.procedimento(), dados.ctoAntiga(), dados.localidade(), dados.observacao());
        }else{

            var buscaPorta = portaRepository.findById(dados.porta());

            var buscaCliente = clienteRepository.findByCodigo(dados.codigo());
            cliente = buscaCliente.orElseGet(() -> {
                return new Cliente(dados.codigo());
            });

            var porta = buscaPorta.get();

            if (porta.getClientes() == null) {
                cliente.setPortaCliente(porta);
                clienteRepository.save(cliente);
            }else {
                clienteRepository.removerPortaDeCliente(porta.getClientes().getId());
                cliente.setPortaCliente(porta);
                clienteRepository.save(cliente);
            }

            var buscaOlt = oltRepository.findById(dados.olt());
            var buscaCto = ctoRepository.findById(dados.cto());
            registro = new Registro(null, cliente, buscaOlt.get(), buscaCto.get(), cliente.getPortaCliente(), equipeTecnica.get(), dados.dataregistro(), dados.procedimento(), dados.ctoAntiga(), dados.localidade(), dados.observacao());

        }

        return registro;
    }

}
