package br.com.w4solution.controle_instalacao.services.olt;

import br.com.w4solution.controle_instalacao.domain.olt.Cto;
import br.com.w4solution.controle_instalacao.domain.olt.Olt;
import br.com.w4solution.controle_instalacao.domain.olt.Porta;
import br.com.w4solution.controle_instalacao.dto.olt.*;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import br.com.w4solution.controle_instalacao.validations.ValidacaoCtoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OltService {

    @Autowired
    OltRepository repository;
    @Autowired
    PortaRepository repositoryPorta;
    @Autowired
    CtoRepository repositoryCto;

    public List<OltDTO> listarOlts(){
        return repository.findAll().stream().map(OltDTO::new).toList();
    }

    public List<CtoDTO> listarCtos(Long id){
        var olt = repository.findById(id);
        if(olt.isPresent()){
            return olt.get().getCto().stream().map(CtoDTO::new).toList();
        }
        throw new ValidacaoCtoException("CTO não encontrada");
    }

    public List<PortaDTO> listarPortas(Long id){
        var portas = repositoryPorta.findPortasByCtoIdWithClientes(id);

        return portas.stream().map(p -> {
            if(p.getClientes() != null){
                return new PortaDTO(p.getId(), p.getPorta(), p.getClientes().getCodigo());
            }else {
                return new PortaDTO(p.getId(), p.getPorta(), null);
            }
        }).toList();
    }

    public Olt cadastrarOlt(CadastroOlt cadastroOlt){
        var olt = new Olt(cadastroOlt);
        repository.save(olt);
        return olt;
    }

    public Cto cadastrarCto(CadastroCTO dados){
        var olt = repository.findById(dados.idOlt());

        List<Porta> portas = new ArrayList<>();

        var cto = new Cto(null, dados.nomeCto(), portas, olt.get(), null);

        for(int i = 1; i <= dados.portas(); i++ ){
            portas.add(new Porta(i, cto));
        }

        repositoryCto.save(cto);

        return cto;
    }

}
