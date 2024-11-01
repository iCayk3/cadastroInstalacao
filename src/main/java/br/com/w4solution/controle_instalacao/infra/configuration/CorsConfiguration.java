package br.com.w4solution.controle_instalacao.infra.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // permite todos os endpoints da API
                .allowedOrigins("http://localhost:3000") // permite apenas requisições de localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // métodos HTTP permitidos
                .allowedHeaders("*") // permite todos os cabeçalhos
                .allowCredentials(true); // permite enviar cookies, se necessário
    }
}
