package es.isst.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.isst.model.RegistroAlimento;

public interface RegistroAlimentoRepository extends CrudRepository<RegistroAlimento, Integer> {
List<RegistroAlimento> findByRegistroAlimento(Integer id);
}
