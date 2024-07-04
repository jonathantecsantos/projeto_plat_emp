package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Ods;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.OdsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OdsService {

    @Autowired
    private OdsRepository odsRepository;

    public Ods buscarOdsPorId(Long id) throws Exception {

        Ods ods;
        try {
            Optional<Ods> optionalOds = odsRepository.findById(id);
            if (optionalOds.isPresent()) {
                ods = optionalOds.get();

            } else {
                throw new Exception("ODS não encontrado com o ID: " + id);
            }
        } catch (Exception e) {
            throw new Exception("Erro ao buscar ODS: " + e.getMessage(), e);
        }
        return ods;
    }
}
