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
  project,
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
    heroImage.src = heroImage.src.replace("/public", "");
  }
  return (
    <Layout
      title={title}
      description={description}
      bgColor={bgColor}
      project={project.toUpperCase()}
    >
      <article className="space-y-4">
        {heroImage && (
          <div>
            <Image
              className="w-full"
              src={heroImage.src}
              alt={heroImage.alt}
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
