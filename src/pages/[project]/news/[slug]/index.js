import { News } from "@/layouts/News";
import { getNewsArticleIds, getNewsArticle } from "@/lib/markdown";

export async function getStaticPaths() {
  const paths = getNewsArticleIds();

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const news = await getNewsArticle(params.slug);
  const project = params.project;
  const slug = params.slug;
  return {
    props: {
      news,
      project,
      slug,
    },
  };
}

export default function Page({ news, project }) {
  const bgColor =
    ["mmp", "MMP"].includes(project) === "mmp" ? "bg-neutral-50" : "";
  return (
    <News bgColor={bgColor} {...news} project={project}>
      <div dangerouslySetInnerHTML={{ __html: news.contentHtml }} />
    </News>
  );
}
