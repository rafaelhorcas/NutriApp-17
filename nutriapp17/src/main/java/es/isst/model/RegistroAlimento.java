package es.isst.model;

import java.util.Date;
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
    private Integer id;
    private double cantidad;
    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "usuario_email")
    private Usuario usuario; // FK

    @ManyToOne
    @JoinColumn(name = "alimento_nombre")
    private Alimento alimento; // FK

    public RegistroAlimento(Integer id, Alimento alimento, Double cantidad, Date fecha) {
        this.id = id;
        this.alimento= alimento;
        this.cantidad = cantidad;
        this.fecha = fecha;
    }

    // Métodos para acceder y modificar los atributos
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
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
