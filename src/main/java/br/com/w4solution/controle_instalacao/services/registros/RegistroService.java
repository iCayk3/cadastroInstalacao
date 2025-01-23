package br.com.w4solution.controle_instalacao.services.registros;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import br.com.w4solution.controle_instalacao.dto.registro.*;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import br.com.w4solution.controle_instalacao.repository.registro.RegistroRepository;
import br.com.w4solution.controle_instalacao.services.ValidacoesRegistro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RegistroService {

    @Autowired
    RegistroRepository registroRepository;
    @Autowired
    EquipeTecnicaRepository equipeTecnicaRepository;
    @Autowired
    ValidacoesRegistro validacoesRegistro;
    @Autowired
    ClienteRepository clienteRepository;
    @Autowired
    OltRepository oltRepository;
    @Autowired
    PortaRepository portaRepository;
    @Autowired
    CtoRepository ctoRepository;

    public List<RegistroDTO> listarTodosRegistros(Long equipe, String filtro){
        if(equipe != null){
            return registroRepository.encontrarRegistroPorEquipe(equipe).stream().map(RegistroDTO::new).toList();
        }
        if(filtro != null){
            LocalDate data = LocalDate.parse(filtro);
            return registroRepository.encontrarPorData(data.getMonthValue(), data.getYear()).stream().map(RegistroDTO::new).toList();
        }
        return registroRepository.findAllByOrderByIdDesc().stream().map(RegistroDTO::new).toList();
    }

    public List<ServicosPorEquipeMensal> listarServicosPorEquipe(String filtro){
        var equipes = equipeTecnicaRepository.findAll();
        var variavel = equipes.stream().map(e -> {

            List<Object[]> resultados = null;
            if(filtro != null){
                LocalDate data = LocalDate.parse(filtro);
                resultados  = registroRepository.EncontrarRegistroMensalPorTecnico(e.getId(), data.getMonthValue(), data.getYear());
            }else {
                resultados  = registroRepository.EncontrarRegistroMensalPorTecnico(e.getId(), LocalDate.now().getMonth().getValue(), LocalDate.now().getYear());
            }
            List<ServicosEquipe> servicos2 = new ArrayList<>();
            for (Object[] resultado : resultados) {
                Procedimento procedimento = (Procedimento) resultado[0];
                Long quantidade = (Long) resultado[1];
                servicos2.add(new ServicosEquipe(procedimento.toString(), quantidade));
            }
            return new ServicosPorEquipeMensal(e.getNomeEquipe(), servicos2);
        }).toList();

        return variavel;
    }

    public List<RegistroDTO> listarTop5Registros(){
        return registroRepository.findTop5ByOrderByIdDesc().stream().map(RegistroDTO::new).toList();
    }

    public ResumoServicoMensalDTO resumoMensal(String filtro){
        LocalDate data = LocalDate.parse(filtro);

        var resumoReativacao = registroRepository.buscarResumoMensal(Procedimento.REATIVACAO, data.getMonthValue(), data.getYear());
        if(resumoReativacao == null){
            resumoReativacao = 0;
        }
        var resumoCancelamento = registroRepository.buscarResumoMensal(Procedimento.CANCELAMENTO, data.getMonthValue(), data.getYear());
        if(resumoCancelamento == null){
            resumoCancelamento = 0;
        }
        var resumoInstalacao = registroRepository.buscarResumoMensal(Procedimento.INSTALACAO, data.getMonthValue(), data.getYear());
        if(resumoInstalacao == null){
            resumoInstalacao = 0;
        }
        var resumoMigracao = registroRepository.buscarResumoMensal(Procedimento.MIGRACAO, data.getMonthValue(), data.getYear());
        if(resumoMigracao == null){
            resumoMigracao = 0;
        }
        var resumoMudanca = registroRepository.buscarResumoMensal(Procedimento.MUDANCA_ENDERECO, data.getMonthValue(), data.getYear());
        if(resumoMudanca == null){
            resumoMudanca = 0;
        }
        var resumoReparo = registroRepository.buscarResumoMensal(Procedimento.REPARO, data.getMonthValue(), data.getYear());
        if(resumoReparo == null){
            resumoReparo = 0;
        }
        var resumoTroca = registroRepository.buscarResumoMensal(Procedimento.TROCA_EQUIPAMENTO, data.getMonthValue(), data.getYear());
        if(resumoTroca == null){
            resumoTroca = 0;
        }
        var resumoSemInternet = registroRepository.buscarResumoMensal(Procedimento.SEM_INTERNET, data.getMonthValue(), data.getYear());
        if(resumoSemInternet == null){
            resumoSemInternet = 0;
        }
        var resumoLentidao = registroRepository.buscarResumoMensal(Procedimento.LENTIDAO, data.getMonthValue(), data.getYear());
        if(resumoLentidao == null){
            resumoLentidao = 0;
        }
        var resumoMudancaComodo = registroRepository.buscarResumoMensal(Procedimento.MUDANCA_COMODO, data.getMonthValue(), data.getYear());
        if(resumoMudancaComodo == null){
            resumoMudancaComodo = 0;
        }
        var resumoTrocaSenha = registroRepository.buscarResumoMensal(Procedimento.TROCA_SENHA, data.getMonthValue(), data.getYear());
        if(resumoTrocaSenha == null){
            resumoTrocaSenha = 0;
        }
        var resumoOutros = registroRepository.buscarResumoMensal(Procedimento.OUTROS, data.getMonthValue(), data.getYear());
        if(resumoOutros == null){
            resumoOutros = 0;
        }
        var resumo = new ResumoServicoMensalDTO(resumoInstalacao, resumoMudanca, resumoTroca,
                resumoCancelamento, resumoReativacao, resumoMigracao, resumoSemInternet, resumoLentidao, resumoMudancaComodo, resumoTrocaSenha, resumoOutros);
        return resumo;
    }

    public Registro cadastrarRegistro(CadastroRegistroDTO dados){
        var registro = validacoesRegistro.validacoesRegistro(dados);
        registroRepository.save(registro);
        return registro;
    }

    public void atualizarRegistro(AtualizarRegistroDTO dados){
        var registro = registroRepository.findById(dados.id());
        if(registro.isPresent()) {
            if (dados.codigo() != null) {
                var buscaCliente = clienteRepository.findByCodigo(dados.codigo());
                var cliente = buscaCliente.orElseGet(() -> {
                    return new Cliente(dados.codigo());
                });
                registro.get().setCliente(cliente);
            }
            if (dados.nomeOlt() != null) {
                var olt = oltRepository.findById(dados.nomeOlt());
                olt.ifPresent(value -> registro.get().setOlt(value));
            }
            if (dados.porta() != null) {
                var porta = portaRepository.findById(dados.porta());
                porta.ifPresent(value -> registro.get().setPorta(value));
            }
            if (dados.nomeCto() != null) {
                var cto = ctoRepository.findById(dados.nomeCto());
                cto.ifPresent(value -> registro.get().setCtoRegistro(value));
            }
            if (dados.nomeEquipeTecnica() != null) {
                var equipeTecnica = equipeTecnicaRepository.findById(dados.nomeEquipeTecnica());
                equipeTecnica.ifPresent(value -> registro.get().setEquipeTecnica(value));
            }
            if (dados.data() != null) {
                registro.get().setData(dados.data());
            }
            if (dados.procedimento() != null) {
                registro.get().setProcedimento(dados.procedimento());
            }
            if (dados.ctoAntiga() != null) {
                registro.get().setCtoAntiga(dados.ctoAntiga());
            }
            if (dados.localidade() != null) {
                registro.get().setLocalidade(dados.localidade());
            }
            if(dados.observacao() != null){
                registro.get().setObservacao(dados.observacao());
            }
        }
    }
}
