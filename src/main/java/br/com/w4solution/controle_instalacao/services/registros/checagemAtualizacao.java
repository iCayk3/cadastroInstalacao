package br.com.w4solution.controle_instalacao.services.registros;

import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import br.com.w4solution.controle_instalacao.dto.registro.AtualizarRegistroDTO;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import br.com.w4solution.controle_instalacao.repository.registro.RegistroRepository;
import br.com.w4solution.controle_instalacao.services.ValidacoesRegistro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class checagemAtualizacao {
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

    @Autowired
    ValidacoesRegistro validacoesRegistro;

    public Registro checarEAtualizarRegistro(AtualizarRegistroDTO dados){

            if(dados.codigo() != null){
                var cliente = clienteRepository.findByCodigo(dados.codigo());
            }
            if(dados.nomeOlt() != null){
                var olt = oltRepository.findById(dados.nomeOlt());
            }
            if(dados.porta() != null){
                var porta = portaRepository.findById(dados.porta());
            }
            if(dados.nomeCto() != null){
                var cto = ctoRepository.findById(dados.nomeCto());
            }
            if(dados.nomeEquipeTecnica() != null){
                var equipeTecnica = equipeTecnicaRepository.findById(dados.nomeEquipeTecnica());
            }
            if(dados.data() != null){
                var data = dados.data();
            }
            if(dados.procedimento() != null){
                var procedimento = dados.procedimento();
            }
            if(dados.ctoAntiga() != null){
                var ctoAntiga = dados.ctoAntiga();
            }
            if(dados.localidade() != null){
                var localidade = dados.localidade();
            }


        return new Registro();
    }
}
