import { pizzaOrderSchema } from "@/http/controllers/pizza-orders/create-pizza-order";
import { IngredientsRepository } from "@/repositories/ingredients-repository";
import { PizzaOrdersRepository } from "@/repositories/pizza-orders-repository";
import { SizesRepository } from "@/repositories/size-repository";
import z from "zod";



export class CreatePizzaOrderUseCase {
  constructor(
    private sizesRepository: SizesRepository,
    private ingredientsRepository: IngredientsRepository,
    private orderRepository: PizzaOrdersRepository
  ) { }
  
  async execute(order: z.infer<typeof pizzaOrderSchema>) {
    
    if (!order.costumerName) {
      throw new Error('Invalid costumerName')
    }

    const checkSizeId = await this.sizesRepository.findById(order.sizeId)

    if (!checkSizeId) {
      throw new Error("Invalid sizeId: " + order.sizeId)
    }

    const checkIngredients = await this.ingredientsRepository.findAllByIds(order.ingredientIds)

    if (checkIngredients.notFound.length > 0) {
      throw new Error("Invalid ingredientsIds: " + checkIngredients.notFound.join(', '))
    }

    const calculateIngredientsPrice = checkIngredients.found.reduce((acc, cur) => acc+= cur.extraPrice, 0)

    const calculatePrice = checkSizeId.basePrice + calculateIngredientsPrice

    const composeOrder = {
      id: crypto.randomUUID(),
      costumerName: order.costumerName,
      size: checkSizeId,
      ingredients: checkIngredients.found,
      finalPrice: calculatePrice,
      createdAt: new Date()
    }

    const createdOrder = await this.orderRepository.create(composeOrder)

    return createdOrder
  }
}