package com.plataforma.empreendedorismo.plataformaempreendedorismo;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.servers.ServerVariable;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Swagger OpenApi", version = "1", description = "API Plataforma Empreendedorismo"))
//servers = @Server(
//		url = "host/api/issue/v1",
//		description = "Descrição do Server",
//		variables = {
//				@ServerVariable(name = "serverUrl", defaultValue = "localhost"),
//				@ServerVariable(name = "serverHttpPort", defaultValue = "8080")
//		}))
public class PlataformaempreendedorismoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlataformaempreendedorismoApplication.class, args);
	}

}
