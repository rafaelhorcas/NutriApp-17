public interface TFGRepository extends CrudRepository<Usuario, String> {
List<TFG> findByUsuario(String email);
}
