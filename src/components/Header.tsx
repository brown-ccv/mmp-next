import { usePathname } from "next/navigation"
import Link from "next/link"
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import { SITE_TITLE, LINKS } from "../consts"
import {HeaderLink} from "./HeaderLink"


    export const HamburgerMenu = () => {
        return (
            <NavigationMenu.Root orientation="vertical">

                <NavigationMenu.List>

                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger className="NavigationMenuTrigger">
                            <HamburgerMenuIcon/>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content>
                            <NavigationMenu.Sub defaultValue="sub1">
                                <NavigationMenu.List>
                                    {LINKS.map(link => (

                                        <NavigationMenu.Item key={link.href}>
                                            <NavigationMenu.Link asChild>
                                                <HeaderLink href={link.href} title={link.title}/>
                                            </NavigationMenu.Link>
                                        </NavigationMenu.Item>

                                    ))}
                                </NavigationMenu.List>
                            </NavigationMenu.Sub>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                </NavigationMenu.List>
            </NavigationMenu.Root>
        )
    }

    export const Header = () => {
        const pathname = usePathname()

  return (
      <NavigationMenu.Root>
          <NavigationMenu.List>
              {LINKS.map(link => (

                  <NavigationMenu.Item key={link.href}>
                      <NavigationMenu.Link asChild>
                          <HeaderLink href={link.href} title={link.title}/>
                      </NavigationMenu.Link>
                  </NavigationMenu.Item>

              ))}
          </NavigationMenu.List>

          <NavigationMenu.Viewport />
      </NavigationMenu.Root>
  )
    }

