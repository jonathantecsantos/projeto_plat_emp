package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoBanner;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Banner;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.BannerRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.CadastroBannerRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AnexoBannerRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.BannerRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BannerService {

    @Value("${upload.caminhoBase}")
    private String caminhoBase;

    @Autowired
    private EquipeService equipeService;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private AnexoBannerRepository anexoBannerRepository;

    @Transactional
    public void criarBanner(List<MultipartFile> files,CadastroBannerRecord cadastroBannerRecord) throws Exception {
        Banner banner = new Banner();

        Equipe equipe = equipeService.buscarEquipePorId(cadastroBannerRecord.idEquipeQ0());

        banner.setTextoDescricaoQ0(cadastroBannerRecord.textoDescricaoQ0());
        banner.setEquipeQ1(cadastroBannerRecord.equipeQ1());
        banner.setParceiroQ1(cadastroBannerRecord.parceiroQ1());
        banner.setAtividadeChaveQ1(cadastroBannerRecord.atividadeChaveQ1());
        banner.setRecursosQ1(cadastroBannerRecord.recursosQ1());
        banner.setCustosQ1(cadastroBannerRecord.custosQ1());
        banner.setOportunidadeNegQ2(cadastroBannerRecord.oportunidadeNegQ2());
        banner.setCustoQ2(cadastroBannerRecord.custoQ2());
        banner.setPropostaValorQ2(cadastroBannerRecord.propostaValorQ2());
        banner.setFonteReceitaQ2(cadastroBannerRecord.fonteReceitaQ2());
        banner.setResultadoFinanceiroQ2(cadastroBannerRecord.resultadoFinanceiroQ2());
        banner.setContextoProblemaQ3(cadastroBannerRecord.contextoProblemaQ3());
        banner.setPublicoFocoImpactoQ3(cadastroBannerRecord.publicoFocoImpactoQ3());
        banner.setIntervencoesQ3(cadastroBannerRecord.intervencoesQ3());
        banner.setSaidasQ3(cadastroBannerRecord.saidasQ3());
        banner.setResultadosCurtoPrazoQ3(cadastroBannerRecord.resultadosCurtoPrazoQ3());
        banner.setResultadosMedioPrazoQ3(cadastroBannerRecord.resultadosMedioPrazoQ3());
        banner.setVisaoImpactoQ3(cadastroBannerRecord.visaoImpactoQ3());

        bannerRepository.save(banner);

        List<AnexoBanner> anexos = salvarAnexos(files, banner);

        banner.getAnexos().clear();
        banner.getAnexos().addAll(anexos);

        bannerRepository.save(banner);
        equipe.setBanner(banner);
        equipeRepository.save(equipe);
    }

    private String saveFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String uploadDir = "uploads/";

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IOException("Não foi possível salvar o arquivo: " + fileName, e);
        }

        return fileName;
    }

    public BannerRecord buscarBannerPorIdEquipe(Long idEquipe) {
        Optional<Equipe> equipeOptional = equipeRepository.findById(idEquipe);

        return equipeOptional.map(equipe -> new BannerRecord(equipe.getBanner())).orElse(null);

    }

    @Transactional
    public void editarBanner(List<MultipartFile> files,CadastroBannerRecord bannerRecord) throws IOException {
        Banner banner = bannerRepository.getReferenceById(bannerRecord.id());
        atualizarBanner(files, banner, bannerRecord);

    }

    private void atualizarBanner(List<MultipartFile> files,Banner banner, CadastroBannerRecord bannerRecord) throws IOException {

        tratarAndSalvarInfosBanner(banner, bannerRecord);

        if (files != null && !files.isEmpty()) {
            List<AnexoBanner> anexosExistentes = tratarAnexos(files, banner);
            banner.setAnexos(anexosExistentes);
        }
    }

    private static void tratarAndSalvarInfosBanner(Banner banner, CadastroBannerRecord bannerRecord) {
        if(bannerRecord.textoDescricaoQ0() != null){
            banner.setTextoDescricaoQ0(bannerRecord.textoDescricaoQ0());
        }
        if(bannerRecord.equipeQ1() != null){
            banner.setEquipeQ1(bannerRecord.equipeQ1());
        }
        if(bannerRecord.parceiroQ1() != null){
            banner.setParceiroQ1(bannerRecord.parceiroQ1());
        }
        if(bannerRecord.atividadeChaveQ1() != null){
            banner.setAtividadeChaveQ1(bannerRecord.atividadeChaveQ1());
        }
        if(bannerRecord.recursosQ1() != null){
            banner.setRecursosQ1(bannerRecord.recursosQ1());
        }
        if(bannerRecord.custosQ1() != null){
            banner.setCustosQ1(bannerRecord.custosQ1());
        }
        if(bannerRecord.oportunidadeNegQ2() != null){
            banner.setOportunidadeNegQ2(bannerRecord.oportunidadeNegQ2());
        }
        if(bannerRecord.custoQ2() != null){
            banner.setCustoQ2(bannerRecord.custoQ2());
        }
        if(bannerRecord.propostaValorQ2() != null){
            banner.setPropostaValorQ2(bannerRecord.propostaValorQ2());
        }
        if(bannerRecord.fonteReceitaQ2() != null){
            banner.setFonteReceitaQ2(bannerRecord.fonteReceitaQ2());
        }
        if(bannerRecord.resultadoFinanceiroQ2() != null){
            banner.setResultadoFinanceiroQ2(bannerRecord.resultadoFinanceiroQ2());
        }
        if(bannerRecord.contextoProblemaQ3() != null){
            banner.setContextoProblemaQ3(bannerRecord.contextoProblemaQ3());
        }
        if(bannerRecord.publicoFocoImpactoQ3() != null){
            banner.setPublicoFocoImpactoQ3(bannerRecord.publicoFocoImpactoQ3());
        }
        if(bannerRecord.intervencoesQ3() != null){
            banner.setIntervencoesQ3(bannerRecord.intervencoesQ3());
        }
        if(bannerRecord.saidasQ3() != null){
            banner.setSaidasQ3(bannerRecord.saidasQ3());
        }
        if(bannerRecord.resultadosCurtoPrazoQ3() != null){
            banner.setResultadosCurtoPrazoQ3(bannerRecord.resultadosCurtoPrazoQ3());
        }
        if(bannerRecord.resultadosMedioPrazoQ3() != null){
            banner.setResultadosMedioPrazoQ3(bannerRecord.resultadosMedioPrazoQ3());
        }
        if(bannerRecord.visaoImpactoQ3() != null){
            banner.setVisaoImpactoQ3(bannerRecord.visaoImpactoQ3());
        }
    }

    private List<AnexoBanner> tratarAnexos(List<MultipartFile> files, Banner banner) throws IOException {
        List<AnexoBanner> anexosExistentes = banner.getAnexos();
        List<String> novosNomesAnexos = files.stream()
                .map(MultipartFile::getOriginalFilename)
                .toList();

        List<AnexoBanner> anexosParaRemover = anexosExistentes.stream()
                .filter(anexo -> !novosNomesAnexos.contains(anexo.getNomeAnexo()))
                .collect(Collectors.toList());

        anexosExistentes.removeAll(anexosParaRemover);
        anexoBannerRepository.deleteAll(anexosParaRemover);

        List<AnexoBanner> novosAnexos = salvarAnexos(files, banner);
        anexosExistentes.addAll(novosAnexos);

        return anexosExistentes;
    }

    private List<AnexoBanner> salvarAnexos(List<MultipartFile> files, Banner banner) throws IOException {
        List<AnexoBanner> anexos = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            if (anexoBannerRepository.findByBannerAndNomeAnexo(banner, fileName) == null) {
                fileName = saveFile(file);
                AnexoBanner anexo = new AnexoBanner();
                anexo.setBanner(banner);
                anexo.setNomeAnexo(fileName);
                anexo.setCaminhoAnexo(caminhoBase + fileName);
                anexos.add(anexo);
            }
        }
        anexoBannerRepository.saveAll(anexos);
        return anexos;
    }
}
