package es.isst.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.isst.model.Usuario;
public interface UsuarioRepository extends CrudRepository<Usuario, String> {
    
    List<Usuario> findByUsuario(String email);
    
}
