package util.exceptions;

public class ValidaAlunoException extends Exception {

    public ValidaAlunoException(){
        super();
    }
    public ValidaAlunoException(String mensagem) {
        super(mensagem);
    }

    public ValidaAlunoException(String mensagem, Throwable causa){
        super(mensagem, causa);
    }

    public ValidaAlunoException(Throwable causa){
        super(causa);
    }
}
