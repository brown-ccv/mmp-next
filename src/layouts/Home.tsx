import { Footer } from "@/components/Footer";
import React from "react";
import Link from "next/link";

interface ProjectConfigProps {
  title: string;
  Logo: React.FC;
  buttonColor: string;
  description: string;
  lede: string;
  href: string;
  body: string;
}

interface HomeLayoutProps {
  config: Array<ProjectConfigProps>;
  children: React.ReactNode;
}

export const Home: React.FC<HomeLayoutProps> = ({ config, children }) => {
  return (
    <div className="body">
      <main>
        {config.map((i) => {
          const { title, buttonColor, Logo, href, description, lede, body } = i;
          return (
            <article key={i.title}>
              <div className="flex flex-col gap-6 pb-4 pt-12">
                <div className="flex gap-6">
                  <Logo />

                  <div className="flex flex-col">
                    <h1>{title}</h1>
                    <h2>{description}</h2>
                  </div>
                </div>
                <h3>{lede}</h3>
                <p className="max-width-full min-width-fit">{body}</p>
                <Link href={href} className="no-underline">
                  <button className={`${buttonColor} no-underline`}>
                    View Project
                  </button>
                </Link>
              </div>
              <hr className="border-none h-0.5 bg-neutral-900 mb-4" />
            </article>
          );
        })}
        {children}
      </main>
      <Footer />
    </div>
  );
};
