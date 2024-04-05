import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FoodDAOImpl implements FoodDAO {
    private Map<Integer, Food> foods = new HashMap<>();
    private int nextId = 1;

    @Override
    public void addFood(Food food) {
        food.setId(nextId++);
        foods.put(food.getId(), food);
    }

    @Override
    public void updateFood(Food food) {
        foods.put(food.getId(), food);
    }

    @Override
    public void deleteFood(int foodId) {
        foods.remove(foodId);
    }

    @Override
    public Food getFoodById(int foodId) {
        return foods.get(foodId);
    }

    @Override
    public List<Food> getAllFoods() {
        return new ArrayList<>(foods.values());
    }

    @Override
    public List<Food> getFoodsByName(String name) {
        return foods.values().stream()
                .filter(food -> food.getName().equalsIgnoreCase(name))
                .collect(Collectors.toList());
    }

    @Override
    public List<Food> getFoodsByCategory(String category) {
        return foods.values().stream()
                .filter(food -> food.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }
}
