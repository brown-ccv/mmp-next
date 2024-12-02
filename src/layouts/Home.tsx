import {Header} from "@/components/Header"
import {Footer} from "@/components/Footer"
import React from "react";
import Head from "next/head";

interface HomeLayoutProps {
  title: string
  description: string
  lede: string
  children: React.ReactNode
}

export const Home: React.FC<HomeLayoutProps> = ({title, description, lede, children}) => {
  return (
      <div className="body">
      <Header/>

      <main>
        <article>
          <div>
            <div className="flex flex-col gap-3 pb-48 md:w-1/2">
              <h1>{title}</h1>
              <h3>{lede}</h3>
            </div>
            <hr className="border-none h-0.5 bg-neutral-900 mb-16"/>

            {children}
          </div>
        </article>
      </main>
      <Footer/>
      </div>

  )
}