package es.isst.repository;

import java.util.List;
import java.util.Date;

import org.springframework.data.repository.CrudRepository;

import es.isst.model.RegistroAlimento;

public interface RegistroAlimentoRepository extends CrudRepository<RegistroAlimento, Integer> {

    List<RegistroAlimento> findByUsuarioAndFecha(String email, Date fecha);
}
