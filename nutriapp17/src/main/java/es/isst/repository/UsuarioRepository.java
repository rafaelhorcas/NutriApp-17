package es.isst.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import es.isst.model.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, String> {
    
    Optional<Usuario> findByEmail(String email);
    
}
