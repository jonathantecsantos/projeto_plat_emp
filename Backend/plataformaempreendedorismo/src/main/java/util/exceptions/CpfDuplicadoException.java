package util.exceptions;

public class CpfDuplicadoException extends Exception{

    public CpfDuplicadoException(){
        super();
    }
    public CpfDuplicadoException(String mensagem) {
        super(mensagem);
    }
}
