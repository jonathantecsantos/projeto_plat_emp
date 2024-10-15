ALTER TABLE subcriterio_avaliacao
    ADD ordem_relatorio INT not NULL;

delete from avaliacao;

delete from subcriterio_avaliacao;

INSERT INTO db_empreendedorismo.subcriterio_avaliacao (descricao,nota_maxima,id_criterio_avaliacao,valor_padrao,ordem_relatorio) VALUES
                                                                                                                                     ('O time fez inscrição no DLJ SEBRAE 2024 com a ideia / proposta do DLEI 2024, sendo Líder + 04 Integrantes?',25.0,1,1,0),
                                                                                                                                     ('O time fez inscrição no DLJ SEBRAE 2023 com a ideia / proposta do DLEI 2024, sendo Líder + 04 Integrantes?',25.0,1,0,1),
                                                                                                                                     ('A classificação do Time do DLEI 2024 está entre os 24 melhores Times do Estado da Paraíba no DLJ SEBRAE 2024?',25.0,1,0,2),
                                                                                                                                     ('O Time do DLEI 2024 foi classificado da Etapa Estadual para a Regional do DLJ SEBRAE 2024?',50.0,1,0,3),
                                                                                                                                     ('O pitch de vídeo apresenta com clareza o problema/solução/protótipo de forma criativa?',50.0,2,null,4),
                                                                                                                                     ('A comunicação do negócio no pitch de vídeo foi clara e assertiva?',50.0,3,null,5),
                                                                                                                                     ('O problema identificado foi relevante e está bem definido no pitch de vídeo?',20.0,4,null,6),
                                                                                                                                     ('A solução encontrada para atacar ou resolver o problema está bem posta no pitch de vídeo?',20.0,4,null,7),
                                                                                                                                     ('Os clientes da solução estão bem identificados e foram exemplificados no pitch de vídeo?',20.0,4,null,8),
                                                                                                                                     ('As fontes de receita levantadas estão bem demostradas no pitch de vídeo?',20.0,4,null,9);

INSERT INTO db_empreendedorismo.subcriterio_avaliacao (descricao,nota_maxima,id_criterio_avaliacao,valor_padrao,ordem_relatorio) VALUES
                                                                                                                                     ('Os impactos socioambientais positivos estão bem explicitados no pitch de vídeo?',20.0,4,null,10),
                                                                                                                                     ('O produto/serviço do negócio ataca um problema relevante?',50.0,5,null,11),
                                                                                                                                     ('Representa uma inovação promissora em relação aos concorrentes?',50.0,5,null,12),
                                                                                                                                     ('O segmento de mercado e a clientela alvo estão bem definidos?',30.0,6,null,13),
                                                                                                                                     ('O produto/serviço do negócio é promissor para esse mercado?',30.0,6,null,14),
                                                                                                                                     ('O produto/serviço do negócio já está gerando receitas com vendas?',40.0,6,null,15),
                                                                                                                                     ('O negócio causa impactos sociais positivos com vistas às desigualdades sociais?',100.0,7,null,16),
                                                                                                                                     ('O negócio traz impactos positivos e benéficios para o meio ambiente e os ecossistemas?',100.0,7,null,17),
                                                                                                                                     ('O modelo de negócio é viável?',25.0,8,null,18),
                                                                                                                                     ('O modelo de negócio é inovador?',25.0,8,null,19);

INSERT INTO db_empreendedorismo.subcriterio_avaliacao (descricao,nota_maxima,id_criterio_avaliacao,valor_padrao,ordem_relatorio) VALUES
                                                                                                                                     ('O modelo de negócio é escalável?',25.0,8,null,20),
                                                                                                                                     ('As estruturas de custos e de receitas estão bem definidas no modelo de negócio?',25.0,8,null,21),
                                                                                                                                     ('O produto/serviço tem viabilidade técnica e econômica? É exequível?',50.0,9,null,22),
                                                                                                                                     ('A versão atual do protótipo desenvolvido já está próxima de um produto/serviço vendável?',50.0,9,null,23),
                                                                                                                                     ('A versão atual já consegue demonstrar o potencial do negócio?',50.0,9,null,24),
                                                                                                                                     ('A qualidade do protótipo consegue mostrar as funcionalidades reais do produto/serviço?',50.0,9,null,25),
                                                                                                                                     ('Os indícios de validação que foram apresentados demonstram que o produto/serviço é promissor?',50.0,10,null,26),
                                                                                                                                     ('O número de pessoas que já validou a versão atual do produto foi suficiente?',50.0,10,null,27);