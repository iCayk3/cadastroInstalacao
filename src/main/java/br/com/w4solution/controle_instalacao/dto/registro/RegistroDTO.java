package br.com.w4solution.controle_instalacao.dto.registro;

import br.com.w4solution.controle_instalacao.domain.registro.Procedimento;
import br.com.w4solution.controle_instalacao.domain.registro.Registro;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class RegistroDTO{

   private Integer codigo;
   private String nomeOlt = "";
   private String nomeCto = "";
   private Integer porta = 0;
   private String nomeEquipeTecnica;
   private LocalDate data;
   private String procedimento;
   private String ctoAntiga;
   private String localidade;

   public RegistroDTO(Registro dados){
       this.codigo = dados.getCliente().getCodigo();
       if(dados.getOlt() !=null){
           this.nomeOlt = dados.getOlt().getNome();
       }
       if(dados.getCtoRegistro() != null){
           this.nomeCto = dados.getCtoRegistro().getNomeCto();
       }
       if(dados.getPorta() != null){
           this.porta = dados.getPorta().getPorta();
       }
       this.nomeEquipeTecnica = dados.getEquipeTecnica().getNomeEquipe();
       this.data = dados.getData().toLocalDate();
       this.procedimento = dados.getProcedimento().toString();
       this.ctoAntiga = dados.getCtoAntiga();
       this.localidade = dados.getLocalidade();
   }

}
