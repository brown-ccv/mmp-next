import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import React from "react";
import MmpLogo from "@/assets/mmp-logo";
import LampLogo from "@/assets/lamp-logo";

interface HomeLayoutProps {
  title: string;
  project: string;
  description: string;
  lede: string;
  bgColor: string;
  children: React.ReactNode;
}

export const ProjectHome: React.FC<HomeLayoutProps> = ({
  title,
  project,
  description,
  lede,
  bgColor,
  children,
}) => {
  return (
    <div className={`body ${bgColor}`}>
      <Header />

      <main>
        <article>
          <div>
            <div className="flex flex-col gap-6 pb-40 md:w-2/3">
              <div className="flex gap-6">
                {project === "mmp" ? <MmpLogo /> : <LampLogo />}
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
