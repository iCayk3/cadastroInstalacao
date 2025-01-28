package br.com.w4solution.controle_instalacao.services;

import br.com.w4solution.controle_instalacao.domain.tecnico.EquipeTecnica;
import br.com.w4solution.controle_instalacao.domain.tecnico.Tecnico;
import br.com.w4solution.controle_instalacao.dto.AtualizarEquipeDTO;
import br.com.w4solution.controle_instalacao.dto.tecnico.*;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.TecnicoRepository;
import br.com.w4solution.controle_instalacao.validations.AtualizarEquipeException;
import br.com.w4solution.controle_instalacao.validations.exceptions.CadastrarTecnicoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class TecnicoService {

    @Autowired
    EquipeTecnicaRepository equipeTecnicaRepository;

    @Autowired
    TecnicoRepository tecnicoRepository;

    public List<EquipeDTO> listarEquipes(){
        var equipeTecnica = equipeTecnicaRepository.findAll();
        return equipeTecnica.stream().map(t -> new EquipeDTO(t.getId(), t.getNomeEquipe())).toList();
    }

    public EquipeTecnica cadastrarEquipeTecnica(CadastroEquipeDTO dados){
        var equipe = new EquipeTecnica(null, dados.nomeEquipe(), null, null);
        equipeTecnicaRepository.save(equipe);
        return equipe;
    }
    public void atualizarEquipeTecnica(AtualizarEquipeDTO dados){
        var equipe = equipeTecnicaRepository.findById(dados.id());
        if(equipe.isEmpty()){
            throw new AtualizarEquipeException("Equipe nao encontrada");
        }
        if(dados.equipe() != null){
            equipe.get().setNomeEquipe(dados.equipe());
        }
    }

    public TecnicoDTO cadastrarTecnico(cadastrarTecnicoDTO dados) {
        var equipe = equipeTecnicaRepository.findById(dados.idEquipe());
        var tecnico = new Tecnico(dados.nome());
        if(equipe.isEmpty()){
            throw new CadastrarTecnicoException("Equipe nao encontrada");
        }
        tecnico.setEquipeTecnica(equipe.get());
        tecnicoRepository.save(tecnico);
        return new TecnicoDTO(tecnico);
    }

    public List<EquipeComTecnicoDTO> listarTecnicoPorEquipe() {
        var equipes = equipeTecnicaRepository.findAllWithTecnicos();
        var equipeComTecnicos = equipes.stream().map(e -> new EquipeComTecnicoDTO(e.getId(), e.getNomeEquipe(), e.getTecnicos().stream().map(
                t -> new TecnicoDTO(t.getId(), t.getNome())
        ).toList())).toList();
        return equipeComTecnicos;
    }
}
