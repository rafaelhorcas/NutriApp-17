import java.util.Date;

public class Usuario{

@NotEmpty private String email;
private boolean espremium;


    public Usuario(String email,boolean espremium;) {
        this.email = email;
        this.espremium = espremium;
    }

    // Métodos para acceder y modificar los atributos
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
      public boolean getEspremium() {
        return espremium;
    }

    public void setEspremium(boolean espremium) {
        this.espremium = espremium;
    }


    // Método para imprimir la información del usuario
    @Override
    public String toString() {
        return "Usuario{" +
                "email='" + email + '\'' +
                ", cantidad=" + cantidad +
                '}';
    }

}  
