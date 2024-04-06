public interface RegistroAlimentoRepository extends CrudRepository<RegistroAlimento, String> {
List<RegistroAlimento> findByTutor(String tutor);
}
