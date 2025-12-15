import { createFileRoute, ErrorComponent, ErrorComponentProps } from '@tanstack/react-router'
import axios from 'redaxios'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { moneyFormatter } from '@/utils/money-formatter'
import { useState } from 'react'
import { SearchIcon, SortAsc, SortDesc } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from '@/hooks/use-debounce'
import { PizzaOrder } from '@/types/orders'

export const Route = createFileRoute('/orders/')({
  component: RouteComponent,
  loader: async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/pizza-orders`)

    return result.data as PizzaOrder[]
  },
  errorComponent: OrdersErrorComponent,
})

function OrdersErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function RouteComponent() {
  const data = Route.useLoaderData()
  const navigator = Route.useNavigate()
  const [search, setSearch] = useState<string | undefined>()
  const [sort, setSort] = useState<{
    field: 'createdAt' | 'finalPrice'
    direction: 'asc' | 'desc'
  } | undefined>(undefined)
  const onSearch = useDebouncedCallback((value: string) => {
    setSearch(value)
  }, 500)

  const filteredData = data
    .filter(order => {
      if (!search) return true
      return order.costumerName.toLowerCase().includes(search.toLowerCase())
    })
    .sort((a, b) => {
      if (!sort) return 0
      let fieldA: string | number | Date
      let fieldB: string | number | Date

      switch (sort.field) {
        case 'createdAt':
          fieldA = new Date(a.createdAt)
          fieldB = new Date(b.createdAt)
          break
        case 'finalPrice':
          fieldA = a.finalPrice
          fieldB = b.finalPrice
          break
        default:
          return 0
      }

      if (fieldA < fieldB) return sort.direction === 'asc' ? -1 : 1
      if (fieldA > fieldB) return sort.direction === 'asc' ? 1 : -1
      return 0
    })

  return (
    <div className='p-8 gap-2 flex flex-col'>
      <div className='flex justify-end items-center gap-4 w-full'>
        <SearchIcon />
        <Input onChange={(e) => onSearch(e.target.value)} placeholder='Search for your pizza order by customer' className='w-full  max-w-md text-accent-foreground' />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead >Customer Name</TableHead>
            <TableHead className="text-right cursor-pointer" onClick={() => {
              if (sort?.field === 'finalPrice' && sort.direction === 'asc') {
                return setSort({ field: 'finalPrice', direction: "desc" })
              }
              setSort({ field: 'finalPrice', direction: "asc" })
            }}>
              <div className='gap-2 items-center flex'>
                Amount
                {sort?.field === 'finalPrice' ? (
                  sort.direction === 'asc' ? <SortAsc className='h-4' /> : <SortDesc className='h-4' />
                ) : <SortDesc className='h-4' />}
              </div>
            </TableHead>
            <TableHead className='gap-2 items-center cursor-pointer' onClick={() => {
              if (sort?.field === 'createdAt' && sort.direction === 'asc') {
                return setSort({ field: 'createdAt', direction: "desc" })
              }
              setSort({ field: 'createdAt', direction: "asc" })
            }}>
              <div className='gap-2 items-center flex'>
                Created At
                {sort?.field === 'createdAt' ? (
                  sort.direction === 'asc' ? <SortAsc className='h-4' /> : <SortDesc className='h-4' />
                ) : <SortDesc className='h-4' />}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((order) => (
            <TableRow key={order.id} onClick={async () => await navigator({ to: '$orderId', params: { orderId: order.id } })} className="cursor-pointer">
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.costumerName}</TableCell>
              <TableCell className="text-right">{moneyFormatter(order.finalPrice / 100)}</TableCell>
              <TableCell>{new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              }).format(new Date(order.createdAt))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
