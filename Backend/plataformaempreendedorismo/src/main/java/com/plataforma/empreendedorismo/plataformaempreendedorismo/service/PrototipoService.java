package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.BannerRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo.AnexoPrototipoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo.CadastroPrototipoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo.EditarPrototipoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo.PrototipoRecord;
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
import java.util.stream.Collectors;

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

            String novoNomeArquivo = "prototipo_" + randomUUID;

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

    public PrototipoRecord buscarPrototipoPorIdEquipe(Long idEquipe) {
        Optional<Equipe> equipeOptional = equipeRepository.findById(idEquipe);
        return equipeOptional.map(equipe -> new PrototipoRecord(equipe.getPrototipo())).orElse(null);
    }

    public void editarPrototipo(List<AnexoPrototipoRecord> files, EditarPrototipoRecord dtoPrototipo) throws Exception {
        Prototipo prototipo = prototipoRepository.getReferenceById(dtoPrototipo.idPrototipo());
        atualizarPrototipo(files, prototipo, dtoPrototipo);

    }

    private void atualizarPrototipo(List<AnexoPrototipoRecord> files, Prototipo prototipo, EditarPrototipoRecord dtoPrototipo) throws Exception {
        tratarAndSalvarPrototipo(prototipo,dtoPrototipo);
        Optional<Equipe> equipeOptional = equipeRepository.findById(dtoPrototipo.idEquipe());

        if (equipeOptional.isPresent()){
            if (files != null && !files.isEmpty()) {
                List<AnexoPrototipo> anexosExistentes = tratarAnexos(files, prototipo,equipeOptional.get());
                prototipo.setAnexos(anexosExistentes);
            }
        }else{
            throw new Exception("Equipe não encotrada!");
        }
    }

    private void tratarAndSalvarPrototipo(Prototipo prototipo, EditarPrototipoRecord dtoPrototipo) {
        if(dtoPrototipo.instituicaoImpactoSocial() != null && dtoPrototipo.instituicaoImpactoSocial().isEmpty()){
            prototipo.setInstituicaoImpactoSocial(dtoPrototipo.instituicaoImpactoSocial());
        }

        if(dtoPrototipo.problemaPrincipal() != null && !dtoPrototipo.problemaPrincipal().isEmpty()){
            prototipo.setProblemaPrincipal(dtoPrototipo.problemaPrincipal());
        }

        if(dtoPrototipo.propostaValor() != null && !dtoPrototipo.propostaValor().isEmpty()){
            prototipo.setPropostaValor(dtoPrototipo.propostaValor());
        }

        if(dtoPrototipo.vantagemCompetitiva() != null && !dtoPrototipo.vantagemCompetitiva().isEmpty()){
            prototipo.setVantagemCompetitiva(dtoPrototipo.vantagemCompetitiva());
        }

        if(dtoPrototipo.principaisNecessidades() != null && !dtoPrototipo.principaisNecessidades().isEmpty()){
            prototipo.setPrincipaisNecessidades(dtoPrototipo.principaisNecessidades());
        }

        if(dtoPrototipo.parcerias() != null && !dtoPrototipo.parcerias().isEmpty()){
            prototipo.setParcerias(dtoPrototipo.parcerias());
        }

        if(dtoPrototipo.tipoApoio() != null && !dtoPrototipo.tipoApoio().isEmpty()){
            prototipo.setTipoApoio(dtoPrototipo.tipoApoio());
        }
    }

    private List<AnexoPrototipo> tratarAnexos(List<AnexoPrototipoRecord> files, Prototipo prototipo, Equipe equipe) throws Exception {
        List<AnexoPrototipo> anexosExistentes = prototipo.getAnexos();
        List<String> novosNomesAnexos = files.stream()
                .map(record -> record.file().getOriginalFilename())
                .toList();

        List<AnexoPrototipo> anexosParaRemover = anexosExistentes.stream()
                .filter(anexo -> !novosNomesAnexos.contains(anexo.getNomeAnexo()))
                .collect(Collectors.toList());

        if (!anexosParaRemover.isEmpty()) {
            anexosExistentes.removeAll(anexosParaRemover);
            anexoPrototipoRepository.deleteAll(anexosParaRemover);
        }

        List<AnexoPrototipo> novosAnexos = salvarAnexos(files, prototipo, equipe);
        anexosExistentes.addAll(novosAnexos);

        return anexosExistentes;
    }

//    private List<AnexoPrototipo> salvarAnexos(List<AnexoPrototipoRecord> files, Prototipo prototipo) throws IOException {
//        List<AnexoPrototipo> anexos = new ArrayList<>();
//
//        for (AnexoPrototipoRecord record : files) {
//            MultipartFile file = record.file();
//
//            Optional<TipoAnexoPrototipo> tipoAnexoId = tipoAnexoPrototipoRepository.findById(record.tipoAnexoId());
//
//            if (anexoPrototipoRepository.findByPrototipoAndNomeAnexo(prototipo, file.getOriginalFilename()) == null) {
//
//                String randomUUID = UUID.randomUUID().toString();
//
//                String novoNomeArquivo = "prototipo_" + randomUUID;
//
//                String extensao = Objects.requireNonNull(file.getOriginalFilename())
//                        .substring(file.getOriginalFilename().lastIndexOf("."));
//
//                String fileName = novoNomeArquivo + extensao;
//                fileName = saveFile(file,fileName);
//                AnexoPrototipo anexo = new AnexoPrototipo();
//                anexo.setPrototipo(prototipo);
//                if(tipoAnexoId.isPresent()){
//                    anexo.setTipoAnexoPrototipo(tipoAnexoId.get());
//                }
//                anexo.setNomeAnexo(fileName);
//                anexo.setCaminhoAnexo(caminhoBase + fileName);
//                anexos.add(anexo);
//            }
//        }
//        anexoPrototipoRepository.saveAll(anexos);
//        return anexos;
//    }
}
