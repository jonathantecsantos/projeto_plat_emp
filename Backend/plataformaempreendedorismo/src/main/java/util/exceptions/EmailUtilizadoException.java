package util.exceptions;

public class EmailUtilizadoException extends Exception{

    public EmailUtilizadoException(){
        super();
    }
    public EmailUtilizadoException(String mensagem) {
        super(mensagem);
    }
}
