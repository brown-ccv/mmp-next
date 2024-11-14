import {FormattedDate} from "../components/FormattedDate"
import {Layout} from "./Layout"
import {NewsData} from "../lib/markdown";
import React from "react";
import Image from "next/image";

export interface News extends NewsData {
  children: React.ReactNode
}

export const News: React.FC<News> = ({title, description, heroImage, pubDate, updatedDate, children}) => {
  return (
      <Layout title={title} description={description}>
        <article className="space-y-4">
          {
              heroImage && (
                  <div>
                    <Image className="w-full" src={heroImage} alt={title}/>
                  </div>
              )
          }
          <FormattedDate date={pubDate} />
          {
              updatedDate && (
                  <div className="last-updated-on">
                    Last updated on
                    <FormattedDate date={updatedDate} />
                  </div>
              )
          }
          <div className="py-3 space-y-4">
            {children}
          </div>
        </article>
      </Layout>

  )
}