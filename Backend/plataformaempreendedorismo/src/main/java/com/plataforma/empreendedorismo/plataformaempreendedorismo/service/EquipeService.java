package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaDadosEquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesAvaliadasRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.instituicao.InstituicaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.tipoAtividade.TipoAtividadeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class EquipeService {

    @Value("${upload.caminhoBase}")
    private String caminhoBase;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private OdsRepository odsRepository;

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private TipoAtividadeRepository tipoAtividadeRepository;

    public ListaDadosEquipeRecord getEquipeDTO(Long equipeId) {
        Equipe equipe = equipeRepository.findById(equipeId).orElseThrow(() -> new RuntimeException("Equipe não encontrada"));
        List<Aluno> alunos = alunoRepository.findByEquipeId(equipeId);
        List<Professor> professores = professorRepository.findProfessoresByEquipeId(equipeId);

        return new ListaDadosEquipeRecord(
                equipe.getNome(),
                alunos,
                professores,
                equipe.getOdsList(),
                equipe.getLinkPitch(),
                equipe.getTipoAtividades(),
                equipe.getInstituicoes(),
                equipe.getLogomarcaTime(),
                equipe.getNomeParceiro1(),
                equipe.getLogomarcaParceiro1(),
                equipe.getNomeParceiro2(),
                equipe.getLogomarcaParceiro2()
        );
    }

    public Equipe buscarEquipePorId(Long id) throws Exception {

        Equipe equipe;
        try {
            Optional<Equipe> optionalEquipeequipe = equipeRepository.findById(id);
            if (optionalEquipeequipe.isPresent()) {
                equipe = optionalEquipeequipe.get();

            } else {
                throw new Exception("Equipe não encontrada com o ID: " + id);
            }
        } catch (Exception e) {
            throw new Exception("Erro ao buscar Equipe: " + e.getMessage(), e);
        }
        return equipe;
    }

    public boolean isUsuarioAdmin() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return false;
        return auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
    }

    public List<ListaEquipesRecord> buscarEquipes(Integer ano) {
        if (!isUsuarioAdmin()) {
            ano = LocalDate.now().getYear();
        }
        if (ano != null) {
            return equipeRepository.findByAno(ano).stream().map(ListaEquipesRecord::new).toList();
        }
        return equipeRepository.findAll().stream().map(ListaEquipesRecord::new).toList();
    }

    public List<Integer> buscarAnos() {
        return equipeRepository.findDistinctAnos();
    }

    @Transactional
    public void editarEquipe(EquipeRecord equipeRecord, MultipartFile logomarcaTime, MultipartFile logomarcaParceiro1, MultipartFile logomarcaParceiro2) throws IOException {
        Equipe equipe = equipeRepository.getReferenceById(equipeRecord.id());

        if (logomarcaTime != null && !logomarcaTime.isEmpty()) {
            String fileNameTime = saveFile(logomarcaTime, "logo_time");
            equipe.setLogomarcaTime(fileNameTime);
        }
        if (logomarcaParceiro1 != null && !logomarcaParceiro1.isEmpty()) {
            String fileNameParceiro1 = saveFile(logomarcaParceiro1, "logo_parceiro1");
            equipe.setLogomarcaParceiro1(fileNameParceiro1);
        }
        if (logomarcaParceiro2 != null && !logomarcaParceiro2.isEmpty()) {
            String fileNameParceiro2 = saveFile(logomarcaParceiro2, "logo_parceiro2");
            equipe.setLogomarcaParceiro2(fileNameParceiro2);
        }

        atualizarEquipe(equipe, equipeRecord);
    }

    private void atualizarEquipe(Equipe equipe, EquipeRecord equipeRecord) {
        if (equipeRecord.nome() != null) {
            equipe.setNome(equipeRecord.nome());
        }
        if (equipeRecord.linkPitch() != null) {
            equipe.setLinkPitch(equipeRecord.linkPitch());
        }
        if (equipeRecord.nomeParceiro1() != null) {
            equipe.setNomeParceiro1(equipeRecord.nomeParceiro1());
        }
        if (equipeRecord.nomeParceiro2() != null) {
            equipe.setNomeParceiro2(equipeRecord.nomeParceiro2());
        }

        if (equipeRecord.listIdOds() != null && !equipeRecord.listIdOds().isEmpty()) {
            List<Ods> odsList = new ArrayList<>();
            for (OdsRecord odsRecord : equipeRecord.listIdOds()) {
                odsRepository.findById(odsRecord.id())
                        .ifPresent(odsList::add);
            }
            equipe.setOdsList(odsList);
        }

        if(equipeRecord.tipoAtividadeList() != null && !equipeRecord.tipoAtividadeList().isEmpty()){
            List<TipoAtividade> tipoAtividadeList = new ArrayList<>();
            for(TipoAtividadeRecord tipoAtividadeRecord : equipeRecord.tipoAtividadeList()){
                tipoAtividadeRepository.findById(tipoAtividadeRecord.id())
                        .ifPresent(tipoAtividadeList::add);
            }
            equipe.setTipoAtividades(tipoAtividadeList);
        }

        if (equipeRecord.instituicoes() != null && !equipeRecord.instituicoes().isEmpty()) {
            List<Instituicao> instituicoes = new ArrayList<>();
            for (InstituicaoRecord instituicaoRecord : equipeRecord.instituicoes()) {
                instituicaoRepository.findById(instituicaoRecord.id())
                        .ifPresent(instituicoes::add);
            }
            equipe.setInstituicoes(instituicoes);
        }

        equipeRepository.save(equipe);
    }

    private String saveFile(MultipartFile file, String prefix) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String randomUUID = UUID.randomUUID().toString();
        String originalFilename = file.getOriginalFilename();
        String extensao = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extensao = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String fileName = prefix + "_" + randomUUID + extensao;

        Path uploadPath = Paths.get(caminhoBase);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }

        return fileName;
    }

    public List<ListaEquipesAvaliadasRecord> buscarEquipesTipoAvaliacao(Integer ano) {
        if (!isUsuarioAdmin()) {
            ano = LocalDate.now().getYear();
        }
        if (ano != null) {
            return equipeRepository.findByAno(ano).stream().map(ListaEquipesAvaliadasRecord::new).toList();
        }
        return equipeRepository.findAll().stream().map(ListaEquipesAvaliadasRecord::new).toList();
    }
}
