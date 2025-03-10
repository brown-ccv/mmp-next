import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { LINKS } from "@/consts";
import { HeaderLink } from "./HeaderLink";
import { usePathname } from "next/navigation";

export const HamburgerMenu = () => {
  return (
    <NavigationMenu.Root
      orientation="vertical"
      className="flex justify-end lg:hidden pt-2"
    >
      <NavigationMenu.List className="flex justify-end">
        <NavigationMenu.Item className="flex flex-col items-end">
          <NavigationMenu.Trigger className="text-neutral-900 font-semibold flex justify-end">
            <HamburgerMenuIcon width={24} height={24} />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Sub defaultValue="sub1">
              <NavigationMenu.List className="flex flex-col items-end space-y-1 p-2">
                <NavigationMenu.Item>
                  <HeaderLink href="/">Home</HeaderLink>
                </NavigationMenu.Item>
                {LINKS.map((link) => (
                  <NavigationMenu.Item key={link.href}>
                    <HeaderLink href={`/mmp${link.href}`}>{link.title}</HeaderLink>
                  </NavigationMenu.Item>
                ))}
              </NavigationMenu.List>
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <NavigationMenu.Root
        orientation="horizontal"
        className="hidden lg:flex lg:justify-end"
      >
        <NavigationMenu.List className="flex justify-end space-x-6 p-4">
          <NavigationMenu.Item className={pathname === "/" ? "hidden" : ""}>
            <HeaderLink href="/">Home</HeaderLink>
          </NavigationMenu.Item>
          {LINKS.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <HeaderLink href={`/mmp${link.href}`}>{link.title}</HeaderLink>
              </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>

        <NavigationMenu.Viewport />
      </NavigationMenu.Root>

      <HamburgerMenu />
    </>
  );
};
