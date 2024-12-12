package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;
import br.com.w4solution.controle_instalacao.dto.registro.*;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import br.com.w4solution.controle_instalacao.repository.registro.RegistroRepository;
import br.com.w4solution.controle_instalacao.services.ValidacoesRegistro;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    @Autowired
    ValidacoesRegistro validacoesRegistro;

    @GetMapping
    public ResponseEntity<List<RegistroDTO>> listarRegistro(@RequestParam(required = false) Long equipe, @RequestParam(required = false) String filtro){
        if(equipe != null){
            var registroPorEquipe = registroRepository.encontrarRegistroPorEquipe(equipe).stream().map(RegistroDTO::new).toList();
            return ResponseEntity.ok().body(registroPorEquipe);
        }
        if(filtro != null){
            System.out.println(filtro);
            LocalDate data = LocalDate.parse(filtro);
            var registros = registroRepository.encontrarPorData(data.getMonthValue(), data.getYear()).stream().map(RegistroDTO::new).toList();
            return ResponseEntity.ok().body(registros);
        }
        var registros = registroRepository.findAllByOrderByIdDesc().stream().map(RegistroDTO::new).toList();
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/servicos/tecnicos/mensal/resumo")
    public ResponseEntity<List<ServicosPorEquipeMensal>> listarServicosPorEquipe(@RequestParam(required = false) String filtro){

        var equipes = equipeTecnicaRepository.findAll();
        System.out.println(filtro);
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

        return ResponseEntity.ok().body(variavel);
    }

    @GetMapping("/top5")
    public ResponseEntity<List<RegistroDTO>> listarTodosRegistros(){
        var registros = registroRepository.findTop5ByOrderByIdDesc().stream().map(RegistroDTO::new).toList();
        return ResponseEntity.ok().body(registros);
    }

    @GetMapping("/servicos/mensais/resumo")
    public ResponseEntity<ResumoServicoMensalDTO> listarResumoMensal(@RequestParam(required = false) String filtro){

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
        var resumo = new ResumoServicoMensalDTO(resumoInstalacao, resumoMudanca, resumoReparo, resumoTroca, resumoCancelamento, resumoReativacao, resumoMigracao);

        return ResponseEntity.ok(resumo);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<RegistroDTO> cadastroRegistro(@RequestBody CadastroRegistroDTO dados, UriComponentsBuilder uri){

        var registro = validacoesRegistro.validacoesRegistro(dados);
        registroRepository.save(registro);

        var uriRegistro = uri.path("/{id}").buildAndExpand(registro.getId()).toUri();

        return ResponseEntity.created(uriRegistro).body(new RegistroDTO(registro));

    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizarRegistro(@RequestBody AtualizarRegistroDTO dados){

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
        }
        return ResponseEntity.ok().build();
    }
}
