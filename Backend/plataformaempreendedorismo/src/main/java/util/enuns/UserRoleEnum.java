package util.enuns;

public enum UserRoleEnum {

    ADMIN("admin"),
    USER("user"),
    AVALIADOR("avaliador");

    private String role;

    UserRoleEnum(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }

}
