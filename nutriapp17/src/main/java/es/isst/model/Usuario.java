package es.isst.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Usuario{

    @Id private String email; 
    private String password;
    private boolean espremium;

    public Usuario(String email, String password, boolean espremium) {
        this.email = email;
        this.password = password;
        this.espremium = espremium;
    }
    public Usuario(String email, boolean espremium) {
        this.email = email;
        this.espremium = espremium;
    }
    public Usuario(){}
    // Métodos para acceder y modificar los atributos
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
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
                ", espremium=" + espremium +
                '}';
    }


}  
