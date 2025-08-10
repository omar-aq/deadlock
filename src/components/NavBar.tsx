import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './ui/mode-toggle';
import logo from '@/assets/deadlock-logo.jpg';

export function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between px-4 py-3 md:px-8 md:py-4">
      <div className="flex min-w-0 items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Deadlock Stats" className="h-9 w-9 rounded" />
          <span className="hidden truncate text-xl font-semibold sm:block">
            Deadlock Stats
          </span>
        </Link>
      </div>

      <div className="hidden flex-1 justify-center md:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-1 md:gap-2 lg:gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors md:text-base"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/heroes"
                  className="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors md:text-base"
                >
                  Heroes
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/items"
                  className="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors md:text-base"
                >
                  Items
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/leaderboard"
                  className="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium transition-colors md:text-base"
                >
                  Leaderboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="hidden items-center gap-2 md:inline-flex"
          aria-label="Login with Steam"
        >
          <img
            src="/src/assets/Steam_logo.svg.png"
            alt="Steam"
            className="size-4"
          />
          <span className="text-sm">Login</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-52">
            <DropdownMenuItem asChild>
              <Link to="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/heroes">Heroes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/items">Items</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/leaderboard">Leaderboard</Link>
            </DropdownMenuItem>
            <div className="bg-border my-1 h-px" />
            <DropdownMenuItem className="justify-between">
              <span>Login with Steam</span>
              <img
                src="/src/assets/Steam_logo.svg.png"
                alt="Steam"
                className="size-4"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
