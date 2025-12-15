import { InMemoryIngredientsRepository } from "@/repositories/in-memory/in-memory-ingredients-repository";
import { InMemoryPizzaOrdersRepository } from "@/repositories/in-memory/in-memory-pizza-orders-repository";
import { InMemorySizesRepository } from "@/repositories/in-memory/in-memory-sizes-repository";
import { IngredientsRepository } from "@/repositories/ingredients-repository";
import { PizzaOrdersRepository } from "@/repositories/pizza-orders-repository";
import { SizesRepository } from "@/repositories/size-repository";

export const ingredientsRepository: IngredientsRepository = new InMemoryIngredientsRepository()

export const sizeRepository: SizesRepository = new InMemorySizesRepository()

export const pizzaOrdersRepository: PizzaOrdersRepository = new InMemoryPizzaOrdersRepository()




