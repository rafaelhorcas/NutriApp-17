public interface RegistroAlimentoRepository extends CrudRepository<RegistroAlimento, String> {
List<RegistroAlimento> findByRegistroAlimento(Int id);
}
