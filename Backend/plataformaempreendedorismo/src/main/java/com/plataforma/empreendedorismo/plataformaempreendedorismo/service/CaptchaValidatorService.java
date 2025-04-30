package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.captcha.GoogleCaptchaResponse;

@Service
public class CaptchaValidatorService {

    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;

    private static final String GOOGLE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

    public boolean validateCaptcha(String captchaToken) {
        if (captchaToken == null || captchaToken.isEmpty()) {
            return false;
        }
        RestTemplate restTemplate = new RestTemplate();

        String url = String.format("%s?secret=%s&response=%s", 
            GOOGLE_VERIFY_URL, 
            recaptchaSecret, 
            captchaToken);

        try {
            GoogleCaptchaResponse response = restTemplate.postForObject(
                url,
                null, 
                GoogleCaptchaResponse.class
            );
            
            return response != null && response.isSuccess();
        } catch (Exception e) {
            return false;
        }
    }
}
