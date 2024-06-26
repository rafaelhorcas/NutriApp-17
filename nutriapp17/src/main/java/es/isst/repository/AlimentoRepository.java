package es.isst.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import es.isst.model.Alimento;

public interface AlimentoRepository extends CrudRepository<Alimento, String> {

    List<Alimento> findByNombre(String nombre);
}
