package util.exceptions;

public class AlunoJaInscritoNoAnoAtualException extends Exception {

    private static final long serialVersionUID = 1L;

    public AlunoJaInscritoNoAnoAtualException() {
        super();
    }

    public AlunoJaInscritoNoAnoAtualException(String mensagem) {
        super(mensagem);
    }

    public AlunoJaInscritoNoAnoAtualException(String mensagem, Throwable causa) {
        super(mensagem, causa);
    }

    public AlunoJaInscritoNoAnoAtualException(Throwable causa) {
        super(causa);
    }
}
