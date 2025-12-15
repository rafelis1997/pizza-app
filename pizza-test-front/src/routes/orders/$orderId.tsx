import { NotFound } from '@/components/NotFound'
import { moneyFormatter } from '@/utils/money-formatter'
import { createFileRoute, notFound } from '@tanstack/react-router'
import axios from 'redaxios'
import { Ingredient } from '..'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { PizzaOrder } from '@/types/orders'

export type RedaxiosError = {
  status?: number
  response?: {
    status: number
  }
}

export const Route = createFileRoute('/orders/$orderId')({
  loader: async ({ params: { orderId } }) => {
    let result

    try {
      result = await axios.get(`${import.meta.env.VITE_API_URL}/pizza-orders/${orderId}`)
    } catch (error) {
      const err = error as RedaxiosError
      if (err.status === 404) {
        throw notFound()
      }
      throw new Error('API unreachable')
    }

    return result.data as PizzaOrder
  },
  component: RouteComponent,
  notFoundComponent: () => {
    return <NotFound>Order not found</NotFound>
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className='flex flex-col gap-4 p-8'>
      <div className='flex gap-4 items-center'>
        <Button variant={"secondary"} onClick={() => window.history.back()}>
          <ChevronLeft />
        </Button>
        <h2 className='text-xl'>Order</h2>
      </div>
      <div>
        <span className='font-bold'>Order ID:</span> {data.id}
      </div>
      <div>
        <span className='font-bold'>Customer Name:</span> {data.costumerName}
      </div>
      <div>
        <span className='font-bold'>Size:</span> {data.size.name}
      </div>
      <div>
        <span className='font-bold'>Ingredients:</span>
        <ul className='list-disc list-inside'>
          {data.ingredients.map((ingredient: Ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <span className='font-bold'>Created At:</span> {new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
          timeStyle: "short",
        }).format(new Date(data.createdAt))}
      </div>
      <div>
        <span className='font-bold'>Total Price:</span> {moneyFormatter(data.finalPrice / 100)}
      </div>
    </div>
  )
}
