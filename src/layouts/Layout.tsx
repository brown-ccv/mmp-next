import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import React from "react";
import Head from "next/head";

interface LayoutProps {
  title: string;
  project: string;
  description: string;
  lede?: string;
  bgColor?: string;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  project,
  description,
  lede,
  bgColor = "",
  children,
}) => {
  return (
    <>
      <a
        href="#main-content"
        className="absolute z-50 -top-[80px] bg-white text-black py-8px px-16px z-1000 focus:top-0"
      >
        Skip to main content
      </a>
      <Head>
        <title>{`${project} - ${title}`}</title>
      </Head>
      <div className={`body ${bgColor}`}>
        <div className="flex flex-col h-full">
          <Header project={project} />
          <main className="grow" id="main-content">
            <article>
              <div>
                <div className="space-y-3 pb-6">
                  <h1>{title}</h1>
                </div>
                <hr className="border-none h-0.5 bg-neutral-900 mb-16" />
                {children}
              </div>
            </article>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
