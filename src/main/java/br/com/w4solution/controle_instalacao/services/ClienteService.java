package br.com.w4solution.controle_instalacao.services;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.dto.cliente.AtualizarClienteDTO;
import br.com.w4solution.controle_instalacao.dto.cliente.ClienteCadastroDTO;
import br.com.w4solution.controle_instalacao.dto.cliente.ClienteDTO;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import br.com.w4solution.controle_instalacao.validations.ValidacoesClientesExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository repository;

    @Autowired
    PortaRepository portaRepository;

    public Cliente cadastrarCliente(ClienteCadastroDTO dados){
        var clienteExist = repository.findByCodigo(dados.codigo());
        if(clienteExist.isEmpty()){
            var cliente = new Cliente(null, dados.nome(), dados.codigo(), null, null);
            repository.save(cliente);
            return cliente;
        }

        var cliente = clienteExist.get();
        cliente.setNome(dados.nome());

        return cliente;
    }

    public ClienteDTO atualizarCliente(AtualizarClienteDTO dados){
        System.out.println(dados.id());
        var cliente = repository.findById(dados.id());
        var porta = portaRepository.findById(dados.idPorta());
        if(cliente.isPresent() && porta.isPresent()){
            cliente.get().atualizarCliente(dados.nome(), porta.get());
            return new ClienteDTO(cliente.get());
        }
        throw new ValidacoesClientesExceptions("Cliente ou porta não encontrado.");
    }
}
