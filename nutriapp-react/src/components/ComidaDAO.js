import java.util.List;

public interface FoodDAO {
    void addFood(Food food);
    void updateFood(Food food);
    void deleteFood(int foodId);
    Food getFoodById(int foodId);
    List<Food> getAllFoods();
    List<Food> getFoodsByName(String name);
    List<Food> getFoodsByCategory(String category);
}
