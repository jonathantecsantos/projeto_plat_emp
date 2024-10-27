package util.exceptions;

public class RoleIncorretaException extends Exception {
    public RoleIncorretaException(){
        super();
    }
    public RoleIncorretaException(String mensagem) {
        super(mensagem);
    }
}
