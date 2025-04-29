package util.exceptions;

public class EmailDuplicadoException extends Exception{

    public EmailDuplicadoException(){
        super();
    }
    public EmailDuplicadoException(String mensagem) {
        super(mensagem);
    }
}
