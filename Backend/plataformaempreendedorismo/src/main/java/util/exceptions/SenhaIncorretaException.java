package util.exceptions;

public class SenhaIncorretaException extends Exception {
    public SenhaIncorretaException(){
        super();
    }
    public SenhaIncorretaException(String mensagem) {
        super(mensagem);
    }
}
