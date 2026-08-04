package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    List<Aluno> findByEquipeId(Long equipeId);

    List<Aluno> findByCpf(String cpf);

    List<Aluno> findByEmail(String email);

    Aluno findByCpfAndAnoLetivo(String cpf, Integer anoLetivo);

    Aluno findByEmailAndAnoLetivo(String email, Integer anoLetivo);
}
