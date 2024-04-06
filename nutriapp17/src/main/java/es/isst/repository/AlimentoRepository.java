public interface AlimentoRepository extends CrudRepository<Alimento, String> {
List<Alimento> findByAlimento(String nombre);
}
