import java.util.Date;

public class  Alimento{

@NotEmpty private String nombre;
private Int cantidad;
private Double calorias;
private Double proteinas;
private Double carbohidratos;
private Double grasas;


    public Alimento(String nombre, double cantidad, double calorias, double carbohidratos, double grasas) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.calorias = calorias;
        this.carbohidratos = carbohidratos;
        this.grasas = grasas;
    }

    // Métodos para acceder y modificar los atributos
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public double getCalorias() {
        return calorias;
    }

    public void setCalorias(double calorias) {
        this.calorias = calorias;
    }

    public double getCarbohidratos() {
        return carbohidratos;
    }

    public void setCarbohidratos(double carbohidratos) {
        this.carbohidratos = carbohidratos;
    }

    public double getGrasas() {
        return grasas;
    }

    public void setGrasas(double grasas) {
        this.grasas = grasas;
    }
    // Método para imprimir la información del alimento
    @Override
    public String toString() {
        return "Alimento{" +
                "nombre='" + nombre + '\'' +
                ", cantidad=" + cantidad +
                ", calorias=" + calorias +
                ", carbohidratos=" + carbohidratos +
                ", grasas=" + grasas +
                '}';
    }

}  
