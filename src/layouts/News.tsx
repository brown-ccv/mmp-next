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
  bgColor,
  children,
}) => {
  const imgPath = heroImage ? heroImage.src.replace("/public", "") : "";
  return (
    <Layout
      title={title}
      description={description}
      bgColor={bgColor}
      project={project}
    >
      <article className="space-y-4">
        {heroImage && (
          <div>
            <Image
              className="w-full"
              src={imgPath}
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
