import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ModeToggle } from './ui/mode-toggle';

export function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between px-8 py-4">
      <div className="flex flex-1 justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-8">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/heroes"
                  className="hover:bg-accent rounded px-4 py-2 text-lg font-medium transition-colors"
                >
                  Hero
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/items"
                  className="hover:bg-accent rounded px-4 py-2 text-lg font-medium transition-colors"
                >
                  Items
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/player"
                  className="hover:bg-accent rounded px-4 py-2 text-lg font-medium transition-colors"
                >
                  Player
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-0 items-center justify-end">
        <ModeToggle />
      </div>
    </nav>
  );
}
