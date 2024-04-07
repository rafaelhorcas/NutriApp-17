package es.isst.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Alimento {
    @Id
    private String nombre; 
    private double calorias;
    private double proteinas;
    private double carbohidratos;
    private double grasas;


    public Alimento(String nombre, double calorias, double proteinas, double carbohidratos, double grasas) {
        this.nombre = nombre;
        this.calorias = calorias;
        this.proteinas = proteinas;
        this.carbohidratos = carbohidratos;
        this.grasas = grasas;
    }

    public Alimento() {
        // Constructor sin argumentos requerido por JPA
    }
    
    // Métodos para acceder y modificar los atributos
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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
        this.proteinas = proteinas;
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
                ", calorias=" + calorias +
                ", carbohidratos=" + carbohidratos +
                ", grasas=" + grasas +
                '}';
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
        long temp;
        temp = Double.doubleToLongBits(calorias);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(proteinas);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(carbohidratos);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(grasas);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Alimento other = (Alimento) obj;
        if (nombre == null) {
            if (other.nombre != null)
                return false;
        } else if (!nombre.equals(other.nombre))
            return false;
        if (Double.doubleToLongBits(calorias) != Double.doubleToLongBits(other.calorias))
            return false;
        if (Double.doubleToLongBits(proteinas) != Double.doubleToLongBits(other.proteinas))
            return false;
        if (Double.doubleToLongBits(carbohidratos) != Double.doubleToLongBits(other.carbohidratos))
            return false;
        if (Double.doubleToLongBits(grasas) != Double.doubleToLongBits(other.grasas))
            return false;
        return true;
    }

}
 
