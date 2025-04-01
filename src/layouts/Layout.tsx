import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import React from "react";
import Head from "next/head";

interface LayoutProps {
  title: string;
  description: string;
  lede?: string;
  children: React.ReactNode;
  bgColor: string;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  description,
  lede,
  children,
  bgColor = "",
}) => {
  return (
    <div className="body">
      <div className="flex flex-col h-full">
        <Header />
        <main className="grow">
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
  );
};
