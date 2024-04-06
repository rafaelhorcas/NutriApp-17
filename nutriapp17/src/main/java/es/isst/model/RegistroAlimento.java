import java.util.Date;

public class  RegistroAlimento{

@NotEmpty private Int id;
private Alimento alimento;
private Double cantidad;
private Date fecha;


    public RegistroAlimento(Int id, private Alimento alimento, private Double cantidad, private Date fecha;) {
        this.id = id;
        this.alimento= alimento;
        this.cantidad = cantidad;
        this.fecha = fecha;
    }

    // Métodos para acceder y modificar los atributos
    public Int getId() {
        return id;
    }

    public void setId(Int id) {
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
