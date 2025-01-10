package com.plataforma.empreendedorismo.plataformaempreendedorismo;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.servers.ServerVariable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Swagger OpenApi", version = "1", description = "API Plataforma Empreendedorismo"))
@ComponentScan(basePackages = "com.plataforma.empreendedorismo")
@EntityScan(basePackages = "com.plataforma.empreendedorismo.plataformaempreendedorismo.model")
@EnableJpaRepositories(basePackages = "com.plataforma.empreendedorismo.plataformaempreendedorismo.repository")

public class PlataformaempreendedorismoApplication {
	public static void main(String[] args) {
		SpringApplication.run(PlataformaempreendedorismoApplication.class, args);
	}

}
