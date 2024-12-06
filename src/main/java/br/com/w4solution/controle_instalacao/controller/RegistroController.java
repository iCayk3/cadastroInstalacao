package br.com.w4solution.controle_instalacao.controller;

import br.com.w4solution.controle_instalacao.domain.cliente.Cliente;
import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import br.com.w4solution.controle_instalacao.dto.registro.CadastroRegistroDTO;
import br.com.w4solution.controle_instalacao.dto.registro.RegistroDTO;
import br.com.w4solution.controle_instalacao.dto.registro.ResumoServicoMensalDTO;
import br.com.w4solution.controle_instalacao.repository.cliente.ClienteRepository;
import br.com.w4solution.controle_instalacao.repository.equipeTecnica.EquipeTecnicaRepository;
import br.com.w4solution.controle_instalacao.repository.olt.CtoRepository;
import br.com.w4solution.controle_instalacao.repository.olt.OltRepository;
import br.com.w4solution.controle_instalacao.repository.olt.PortaRepository;
import br.com.w4solution.controle_instalacao.repository.registro.RegistroRepository;
import br.com.w4solution.controle_instalacao.services.ValidacoesRegistro;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;

import static java.util.stream.Collectors.toList;

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
    public ResponseEntity<List<RegistroDTO>> listarRegistro(){
        var registros = registroRepository.findTop5ByOrderByIdDesc().stream().map(RegistroDTO::new).toList();
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<RegistroDTO>> listarTodosRegistros(@PageableDefault(size = 15) Pageable pageable, @RequestParam(required = false) String parametros){
        var registros = registroRepository.findAllByOrderByIdDesc(pageable).map(RegistroDTO::new);
        return ResponseEntity.ok().body(registros);
    }

    @GetMapping("/servicos/mensais/resumo")
    public ResponseEntity<ResumoServicoMensalDTO> listarResumoMensal(){
        var resumoReativacao = registroRepository.buscarResumoMensal(Procedimento.REATIVACAO, LocalDate.now().getMonth().getValue(), LocalDate.now().getYear());
        if(resumoReativacao == null){
            resumoReativacao = 0;
        }
        var resumoCancelamento = registroRepository.buscarResumoMensal(Procedimento.CANCELAMENTO, LocalDate.now().getMonth().getValue(), LocalDate.now().getYear());
        if(resumoCancelamento == null){
            resumoCancelamento = 0;
        }
        var resumoInstalacao = registroRepository.buscarResumoMensal(Procedimento.INSTALACAO, LocalDate.now().getMonth().getValue(), LocalDate.now().getYear());
        if(resumoInstalacao == null){
            resumoInstalacao = 0;
        }
        var resumoMigracao = registroRepository.buscarResumoMensal(Procedimento.MIGRACAO, LocalDate.now().getMonth().getValue(), LocalDate.now().getYear());
        if(resumoMigracao == null){
            resumoMigracao = 0;
        }
        var resumoMudanca = registroRepository.buscarResumoMensal(Procedimento.MUDANCA_ENDERECO, LocalDate.now().getMonth().getValue(), LocalDate.now().getYear());
        if(resumoMudanca == null){
            resumoMudanca = 0;
        }
        var resumoReparo = registroRepository.buscarResumoMensal(Procedimento.REPARO, LocalDate.now().getMonth().getValue(), LocalDate.now().getYear());
        if(resumoReparo == null){
            resumoReparo = 0;
        }
        var resumoTroca = registroRepository.buscarResumoMensal(Procedimento.TROCA_EQUIPAMENTO, LocalDate.now().getMonth().getValue(), LocalDate.now().getYear());
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
}
