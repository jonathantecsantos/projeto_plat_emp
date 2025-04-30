package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.captcha;

import lombok.Data;

import java.util.List;

@Data
public class GoogleCaptchaResponse {

    private boolean success;

    private String challengeTs;

    private String hostname;

    private List<String> errorCodes;
    
    public boolean isSuccess() {
      return success;
  }
}
