package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoPrototipo;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Prototipo;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.TipoAnexoPrototipo;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo.AnexoPrototipoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo.CadastroPrototipoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AnexoPrototipoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.PrototipoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.TipoAnexoPrototipoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class PrototipoService {

    @Autowired
    private EquipeService equipeService;

    @Autowired
    private PrototipoRepository prototipoRepository;

    @Autowired
    private AnexoPrototipoRepository anexoPrototipoRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private TipoAnexoPrototipoRepository tipoAnexoPrototipoRepository;

    @Value("${upload.caminhoBase}")
    private String caminhoBase;

    @Transactional
    public void criarPrototipo(List<AnexoPrototipoRecord> files, CadastroPrototipoRecord cadastroPrototipoRecord) throws Exception {

        Prototipo prototipo = new Prototipo();

        Equipe equipe = equipeService.buscarEquipePorId(cadastroPrototipoRecord.idEquipe());

        prototipo.setInstituicaoImpactoSocial(cadastroPrototipoRecord.instituicaoImpactoSocial());
        prototipo.setProblemaPrincipal(cadastroPrototipoRecord.problemaPrincipal());
        prototipo.setPropostaValor(cadastroPrototipoRecord.propostaValor());
        prototipo.setVantagemCompetitiva(cadastroPrototipoRecord.vantagemCompetitiva());
        prototipo.setPrincipaisNecessidades(cadastroPrototipoRecord.principaisNecessidades());
        prototipo.setParcerias(cadastroPrototipoRecord.parcerias());
        prototipo.setTipoApoio(cadastroPrototipoRecord.tipoApoio());

        prototipoRepository.save(prototipo);

        List<AnexoPrototipo> anexos = salvarAnexos(files,prototipo,equipe);
        prototipo.getAnexos().clear();
        prototipo.getAnexos().addAll(anexos);

        prototipoRepository.save(prototipo);
        equipe.setPrototipo(prototipo);
        equipeRepository.save(equipe);
    }

    private List<AnexoPrototipo> salvarAnexos(List<AnexoPrototipoRecord> files, Prototipo prototipo, Equipe equipe) throws Exception {
        List<AnexoPrototipo> anexos = new ArrayList<>();

        for (AnexoPrototipoRecord file : files) {

            Optional<TipoAnexoPrototipo> optionalTipoAnexoPrototipo = tipoAnexoPrototipoRepository.findById(file.tipoAnexoId());
            TipoAnexoPrototipo tipoAnexoPrototipo = null;
            if(optionalTipoAnexoPrototipo.isPresent()){
                tipoAnexoPrototipo = optionalTipoAnexoPrototipo.get();
            }
            String randomUUID = UUID.randomUUID().toString();

            String novoNomeArquivo = "prototipo_" + equipe.getId() + "_" + prototipo.getId() + "_" + randomUUID;

            String extensao = Objects.requireNonNull(file.file().getOriginalFilename())
                    .substring(file.file().getOriginalFilename().lastIndexOf("."));

            String fileName = novoNomeArquivo + extensao;

            if (anexoPrototipoRepository.findByPrototipoAndNomeAnexo(prototipo, fileName) == null) {

                fileName = saveFile(file.file(), fileName);
                AnexoPrototipo anexo = new AnexoPrototipo();
                anexo.setPrototipo(prototipo);
                anexo.setEquipe(equipe);
                anexo.setTipoAnexoPrototipo(tipoAnexoPrototipo);
                anexo.setNomeAnexo(fileName);
                anexo.setCaminhoAnexo(caminhoBase + fileName);
                anexos.add(anexo);
            }
        }

        anexoPrototipoRepository.saveAll(anexos);
        return anexos;
    }

    private String saveFile(MultipartFile file, String fileName) throws IOException {

        Path filePath = Paths.get(caminhoBase, fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }
}
