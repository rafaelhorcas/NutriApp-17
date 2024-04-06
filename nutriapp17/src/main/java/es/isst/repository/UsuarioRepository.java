public interface TFGRepository extends CrudRepository<TFG, String> {
List<TFG> findByTutor(String tutor);
}
