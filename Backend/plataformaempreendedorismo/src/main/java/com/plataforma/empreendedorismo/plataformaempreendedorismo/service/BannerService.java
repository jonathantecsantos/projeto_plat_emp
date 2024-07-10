package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Anexo;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Banner;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.CadastroBannerRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AnexoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.BannerRepository;
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

@Service
public class BannerService {

    @Value("${upload.caminhoBase}")
    private String caminhoBase;

    @Autowired
    private EquipeService equipeService;

    @Autowired
    private BannerRepository bannerRepository;

    @Autowired
    private AnexoRepository anexoRepository;

    @Transactional
    public void criarBanner(List<MultipartFile> files,CadastroBannerRecord cadastroBannerRecord) throws Exception {
        Banner banner = new Banner();

        Equipe equipe = equipeService.buscarEquipePorId(cadastroBannerRecord.idEquipeQ0());

        banner.setEquipe(equipe);
        banner.setTextoDescricaoQ0(cadastroBannerRecord.textoDescricaoQ0());
        banner.setEquipeQ1(cadastroBannerRecord.equipeQ1());
        banner.setParceiroQ1(cadastroBannerRecord.idParceiroQ1());
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

        List<Anexo> anexos = new ArrayList<>();
        // Processar e salvar cada arquivo
        for (MultipartFile file : files) {
            String fileName = saveFile(file);
            Anexo anexo = new Anexo();
            anexo.setBanner(banner);
            anexo.setNomeAnexo(fileName);
            anexo.setCaminhoAnexo(caminhoBase + fileName);
            anexos.add(anexo);
            anexoRepository.save(anexo);
        }

        banner.setAnexos(anexos);
        bannerRepository.save(banner);
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
}
