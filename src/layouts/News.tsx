import { Layout } from "./Layout";
import { NewsData } from "../lib/markdown";
import React from "react";
import Image from "next/image";

export interface News extends NewsData {
  children: React.ReactNode;
  bgColor: string;
}

export const News: React.FC<News> = ({
  title,
  description,
  heroImage,
  altText,
  pubDate,
  updatedDate,
  bgColor,
  children,
}) => {
  const publishedDate = new Date(pubDate);
  const updatedOnDate = updatedDate ? new Date(updatedDate) : undefined;
  if (heroImage) {
    heroImage = heroImage.replace("/public", "");
  }
  return (
    <Layout title={title} description={description} bgColor={bgColor}>
      <article className="space-y-4">
        {heroImage && altText && (
          <div>
            <Image
              className="w-full"
              src={heroImage}
              alt={altText}
              width={200}
              height={200}
            />
          </div>
        )}
        <div className="py-3 readable space-y-4">{children}</div>
      </article>
    </Layout>
  );
};
