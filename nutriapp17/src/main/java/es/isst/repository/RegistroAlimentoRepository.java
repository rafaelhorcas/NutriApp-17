package es.isst.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import es.isst.model.RegistroAlimento;
import es.isst.model.Usuario;

public interface RegistroAlimentoRepository extends CrudRepository<RegistroAlimento, Integer> {

    List<RegistroAlimento> findByUsuarioAndFecha(Usuario usuario, String fecha);
    List<RegistroAlimento> findByUsuarioAndFechaBetween(Usuario usuario, String fecha, String fechaActual);
    List<RegistroAlimento> findByUsuario(Usuario usuario);
    Optional <RegistroAlimento> findById(Long id);
}
