import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import MmpLogo from "@/assets/mmp-logo";
import React from "react";

interface HomeLayoutProps {
  title: string;
  description: string;
  lede: string;
  children: React.ReactNode;
}

export const Home: React.FC<HomeLayoutProps> = ({
  title,
  description,
  lede,
  children,
}) => {
  return (
    <div className="body">
      <main>
        <article>
          <div>
            <div className="flex flex-col gap-6 pb-40 md:w-2/3">
              <div className="flex gap-6">
                <MmpLogo />
                <div className="flex flex-col">
                  <h1>{title}</h1>
                  <h2>{description}</h2>
                </div>
              </div>
              <h3>{lede}</h3>
            </div>
            <hr className="border-none h-0.5 bg-neutral-900 mb-16" />

            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};
