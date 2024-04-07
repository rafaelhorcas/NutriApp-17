package es.isst.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class  RegistroAlimento{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double cantidad;
    private String fecha;

    @ManyToOne
    @JoinColumn(name = "usuario_email")
    private Usuario usuario; // FK

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "alimento_nombre")
    private Alimento alimento; // FK

    public RegistroAlimento(Long id, Double cantidad, String fecha, Alimento alimento, Usuario usuario) {
        this.id = id;
        this.alimento= alimento;
        this.cantidad = cantidad;
        this.fecha = fecha;
        this.usuario = usuario;
    }
    public RegistroAlimento(){}

    public void setCantidad(Double cantidad) {
        this.cantidad = cantidad;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    // Métodos para acceder y modificar los atributos
    public Long getId() {
        return id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Alimento getAlimento() {
        return alimento;
    }

    public void setAlimento(Alimento alimento) {
        this.alimento = alimento;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    // Método para imprimir la información del alimento.
    @Override
    public String toString() {
        return "RegistroAlimento{" +
                "id='" + id + '\'' +
                ", alimento=" + alimento +
                ", cantidad=" + cantidad +
                ", fecha=" + fecha +
                '}';
    }

}  
