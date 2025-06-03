DELETE FROM recipes;
DELETE FROM ingredients;

INSERT INTO recipes (title, instructions, prep_time) VALUES
  ('Spaghetti Bolognese', 'Cook pasta. Simmer sauce. Combine.', 30),
  ('Pancakes', 'Mix ingredients. Fry on pan.', 15),
  ('Taco Salad', 'Layer lettuce, beef, cheese, and salsa.', 20),
  ('Grilled Cheese', 'Butter bread. Add cheese. Grill.', 10),
  ('Veggie Stir Fry', 'Cook veggies. Add sauce. Serve with rice.', 25);

INSERT INTO ingredients (name, quantity, recipe_id) VALUES
  ('Spaghetti', '200g', 1 ),
  ('Ground Beef', '150g', 1 ),
  ('Pancake Mix', '1 cup', 2 ),
  ('Egg', '1', 2 ),
  ('Lettuce', '2 cups', 3 ),
  ('Salsa', '1/2 cup', 3 ),
  ('Cheddar Cheese', '2 slices', 4 ),
  ('Butter', '1 tbsp', 4 ),
  ('Mixed Vegetables', '1.5 cups', 5 ),
  ('Soy Sauce', '2 tbsp', 5 );