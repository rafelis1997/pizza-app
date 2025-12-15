import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Link, useMatchRoute, useNavigate, useParentMatches } from "@tanstack/react-router"
import { PizzaIcon, SearchIcon } from "lucide-react"
import { FormEvent, useRef } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export function AppSidebar() {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()


  function handleSearchId(e: FormEvent) {
    e.preventDefault()
    const id = searchInputRef.current?.value

    if (!id) return

    if (searchInputRef.current) {
      searchInputRef.current.value = ''
    }


    navigate({ to: '/orders/' + id })
  }

  return (
    <Sidebar variant="inset" className="bg-primary">
      <SidebarHeader className="flex">
        <Link to="/" className="flex flex-row items-center text-primary-foreground">
          <PizzaIcon size={40} />
          <h2 className="p-4 text-2xl font-bold">Pizza App</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <form onSubmit={handleSearchId} className='flex justify-center items-center gap-4 w-full'>
              <Input ref={searchInputRef} placeholder='Search for your pizza ID' className='w-full max-w-2xl text-accent-foreground' />
              <Button variant={"secondary"} className='cursor-pointer' onClick={handleSearchId}>
                <SearchIcon />
              </Button>
            </form>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} isActive={matchRoute({ to: '/', pending: true }) as boolean} asChild>
              <Link to="/" activeOptions={{
              }}>Home</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"} asChild>
              <Link to="/orders">Orders List</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}