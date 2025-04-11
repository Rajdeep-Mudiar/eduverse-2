
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const NavBar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Public Health", path: "/public-health" },
    { name: "Disaster Relief", path: "/disaster-relief" },
    { name: "Education", path: "/education" },
    { name: "Services", path: "/services" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="bg-white dark:bg-eduverse-black border-b dark:border-gray-800 px-6 py-3">
      <NavigationMenu className="max-w-screen-xl mx-auto">
        <NavigationMenuList className="flex-wrap">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <Link to={item.path}>
                <NavigationMenuLink className={cn(
                  navigationMenuTriggerStyle(),
                  "font-medium"
                )}>
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavBar;
