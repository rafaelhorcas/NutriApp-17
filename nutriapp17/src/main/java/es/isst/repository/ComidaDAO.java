public interface ComidaRepository extends CrudRepository<Comida, String> {
List<Comida> findByComida(String comida);
}
