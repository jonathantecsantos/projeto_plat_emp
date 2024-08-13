package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Importacao;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.ImportacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ImportacaoService {

    @Autowired
    private ImportacaoRepository importacaoRepository;
    public Importacao registrarImportacao(Date dataInicio, Date dataFim, String nomeProcesso, String usuario, boolean statusProcessamento){
        Importacao importacao = new Importacao();

        importacao.setDataInicio(dataInicio);
        importacao.setDataFim(dataFim);
        importacao.setNomeProcesso(nomeProcesso);
        importacao.setUsuario(usuario);
        importacao.setProcessado(statusProcessamento);

        importacaoRepository.save(importacao);

        return importacao;
    }

    public void atualizarHoraFinalImportacao(Importacao importacao){
        importacaoRepository.save(importacao);
    }
}
