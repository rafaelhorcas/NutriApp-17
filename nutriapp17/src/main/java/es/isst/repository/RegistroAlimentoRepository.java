public interface RegistroAlimentoRepository extends CrudRepository<RegistroAlimento, String> {
List<RegistroAlimento> findByTutor(Int ID);
}
