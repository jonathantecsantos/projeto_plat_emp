package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoTemplate;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AnexoTemplateRepository;
import util.enuns.TipoTemplate;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AnexoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnexoTemplateRepository anexoTemplateRepository;

    @Test
    public void deveRetornarAnexosPorAno() throws Exception {
        AnexoTemplate cabecalho = new AnexoTemplate(1L, "cabecalho.png", "/caminho/cabecalho.png", 2026, TipoTemplate.CABECALHO);
        AnexoTemplate rodape = new AnexoTemplate(2L, "rodape.png", "/caminho/rodape.png", 2026, TipoTemplate.RODAPE);

        Mockito.when(anexoTemplateRepository.findByAnoLetivo(2026))
                .thenReturn(Arrays.asList(cabecalho, rodape));

        mockMvc.perform(get("/anexo_template/2026")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].tipoTemplate").value("CABECALHO"))
                .andExpect(jsonPath("$[0].anoLetivo").value(2026))
                .andExpect(jsonPath("$[0].nomeArquivo").value("cabecalho.png"))
                .andExpect(jsonPath("$[0].caminho").value("/caminho/cabecalho.png"))
                .andExpect(jsonPath("$[1].tipoTemplate").value("RODAPE"))
                .andExpect(jsonPath("$[1].anoLetivo").value(2026))
                .andExpect(jsonPath("$[1].nomeArquivo").value("rodape.png"))
                .andExpect(jsonPath("$[1].caminho").value("/caminho/rodape.png"));
    }
}
