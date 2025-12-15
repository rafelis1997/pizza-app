import { createFileRoute, notFound } from '@tanstack/react-router'
import axios from 'redaxios'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { moneyFormatter } from '@/utils/money-formatter'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from '@tanstack/react-query'
import { Separator } from '@/components/ui/separator'
import { RedaxiosError } from './orders/$orderId'

export type Ingredient = {
  id: string
  name: string
  extraPrice: number
}

export type PizzaOrder = {
  id: string
  costumerName: string
  size: Size
  ingredients: Ingredient[]
  createdAt: Date
  finalPrice: number
}

export type Size = {
  id: string
  name: string
  basePrice: number
}

const schema = z.object({
  costumerName: z.string().min(1, 'Customer name is required'),
  sizeId: z.string().min(1, 'Size is required'),
  ingredientIds: z.array(z.string()).min(1, 'At least one ingredient must be selected'),
})

type FormDataType = z.infer<typeof schema>

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    let sizes
    let ingredients

    try {
      sizes = await axios.get(`${import.meta.env.VITE_API_URL}/sizes`)
    } catch (error) {
      const err = error as RedaxiosError
      if (err.status === 404) {
        throw notFound()
      }
      throw new Error('API unreachable')
    }

    sizes = sizes.data as Size[]

    try {
      ingredients = await axios.get(`${import.meta.env.VITE_API_URL}/ingredients`)
    } catch (error) {
      const err = error as RedaxiosError
      if (err.status === 404) {
        throw notFound()
      }
      throw new Error('API unreachable')
    }

    ingredients = ingredients.data as Ingredient[]

    return { sizes, ingredients }
  },
})

function App() {
  const { sizes, ingredients } = Route.useLoaderData()

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormDataType) => {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/pizza-orders/create`, data)
      return response.data as PizzaOrder
    }
  })

  const { control, register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm<FormDataType>({
    defaultValues: {
      ingredientIds: [], // ✅ REQUIRED
    },
    resolver: zodResolver(schema),
  })

  const handleSubmit = async (data: FormDataType) => {
    await mutateAsync(data)
  }

  return (
    <div className="flex-1 h-full flex justify-center">
      <div className='flex flex-col size-full max-w-5xl p-4'>
        <h1 className='text-2xl w-full text-center'>Welcome to Pizza App!</h1>

        <div className='flex justify-center gap-8'>
          <form onSubmit={handleFormSubmit(handleSubmit)} className='flex flex-col gap-6 mt-8 w-full max-w-xl'>
            <h2 className='text-xl'>Create Order</h2>
            <div className='flex flex-col gap-2'>
              <label className='font-bold'>Costumer Name</label>
              <Input type="text" {...register("costumerName")} placeholder="Your Name" />
              {errors?.costumerName && <span className='text-red-500 text-sm'>{errors.costumerName.message}</span>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-bold'>Choose a size</label>
              <Controller
                control={control}
                name="sizeId"
                render={({ field }) => (
                  <RadioGroup
                    className='flex gap-4'
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    {sizes.map((size) => (
                      <div className="flex items-center space-x-2" key={size.id}>
                        <RadioGroupItem value={size.id} id={size.id} />
                        <label htmlFor={size.id}>{size.name} - {moneyFormatter(size.basePrice / 100)}</label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {/* <RadioGroup defaultValue={sizes[0].id} className='flex gap-4' {...register("sizeId")}>
                {sizes.map((size) => (
                  <div className="flex items-center space-x-2" key={size.id}>
                    <RadioGroupItem value={size.id} id={size.id} />
                    <label htmlFor={size.id}>{size.name} - {moneyFormatter(size.basePrice / 100)}</label>
                  </div>
                ))}
              </RadioGroup> */}
              {errors?.sizeId && <span className='text-red-500 text-sm'>{errors.sizeId?.message}</span>}
            </div>
            <div className='flex flex-col gap-2'>
              <label className='font-bold'>Ingredients</label>
              <Controller
                control={control}
                name="ingredientIds"
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    {ingredients.map((ingredient) => {
                      const checked = field.value?.includes(ingredient.id)

                      return (
                        <div
                          key={ingredient.id}
                          className="flex gap-2 items-center w-fit"
                        >
                          <Checkbox
                            id={ingredient.id}
                            checked={checked}
                            onCheckedChange={(isChecked) => {
                              const value = isChecked
                                ? [...(field.value ?? []), ingredient.id]
                                : (field.value ?? []).filter(
                                  (id: string) => id !== ingredient.id,
                                )

                              field.onChange(value)
                            }}
                          />

                          <label htmlFor={ingredient.id}>
                            {ingredient.name} – {moneyFormatter(ingredient.extraPrice / 100)}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                )}
              />
              {errors?.ingredientIds && <span className='text-red-500 text-sm'>{errors.ingredientIds?.message}</span>}

            </div>
            <Button disabled={isPending} size={'lg'} type='submit'>Create Order</Button>
          </form>
          {data && (
            <>
              <Separator orientation='vertical' className='mt-8' />
              <div className='flex flex-col gap-4 mt-8'>
                <h2 className='text-xl'>Order created successfully!</h2>
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
                  <span className='font-bold'>Total Price:</span> {moneyFormatter(data.finalPrice / 100)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
