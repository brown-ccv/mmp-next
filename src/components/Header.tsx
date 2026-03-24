import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { LINKS } from "@/consts";
import { HeaderLink } from "./HeaderLink";
import { usePathname } from "next/navigation";

type Props = {
  project: string;
};

export const HamburgerMenu = ({ project }: Props) => {
  return (
    <NavigationMenu.Root
      orientation="vertical"
      className="flex justify-end lg:hidden pt-2"
    >
      <NavigationMenu.Item className="flex flex-col items-end">
        <NavigationMenu.Trigger className="text-neutral-900 font-semibold flex justify-end">
          <HamburgerMenuIcon width={24} height={24} aria-hidden />
          <div className="sr-only">Navigation</div>
        </NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.List className="flex flex-col items-end space-y-1 p-2">
            <NavigationMenu.Item>
              <HeaderLink href={`/${project}`}>Home</HeaderLink>
            </NavigationMenu.Item>
            {LINKS.map((link) => (
              <NavigationMenu.Item key={link.href}>
                <HeaderLink href={`/${project}${link.href}`}>
                  {link.title}
                </HeaderLink>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    </NavigationMenu.Root>
  );
};

export const Header = ({ project }: any) => {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenu.Root
        orientation="horizontal"
        className="hidden lg:flex lg:justify-end"
      >
        <NavigationMenu.List className="flex justify-end space-x-6 p-4">
          <NavigationMenu.Item
            className={pathname === `/${project}` ? "hidden" : ""}
          >
            <HeaderLink href={`/${project}`}>Home</HeaderLink>
          </NavigationMenu.Item>
          {LINKS.map((link) => (
            <NavigationMenu.Item key={link.href}>
              <HeaderLink href={`/${project}${link.href}`}>
                {link.title}
              </HeaderLink>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>

        <NavigationMenu.Viewport />
      </NavigationMenu.Root>

      <HamburgerMenu project={project} />
    </>
  );
};
