import java.util.Date;

public class  Alimento{

@NotEmpty private String nombre;
private Int cantidad;
private Double calorias;
private Double proteinas;
private Double carbohidratos;
private Double grasas;
private Double grasas_saturadas;
private Double azucares;
private Double sal;


    public Alimento(String nombre, double cantidad, double calorias, double proteinas, double carbohidratos, double grasas) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.calorias = calorias;
        this.proteinas = proteinas;
        this.carbohidratos = carbohidratos;
        this.grasas = grasas;
        this.grasas_saturadas = grasas_saturadas;
        this.azucares = azucares;
        this.sal = sal;
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

    public double getProteinas() {
        return proteinas;
    }

    public void setProteinas(double proteinas) {
        this.carbohidratos = proteinas;
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

     public double getGrasas_saturadas() {
        return grasas_saturadas;
    }

    public void setGrasas_saturadas(double grasas_saturadas) {
        this.grasas_saturadas = grasas_saturadas;
    }

     public double getAzucares() {
        return azucares;
    }

    public void setAzucares(double azucares) {
        this.azucares = azucares;
    }

     public double getSal() {
        return sal;
    }

     public void setSal(double sal) {
        this.sal = sal;
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
                ", grasas_saturadas=" + grasas_saturadas +
                ", azucares=" + azucares +
                ", sal=" + sal +
                '}';
    }
}  
