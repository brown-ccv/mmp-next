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
  const project = params.project.toLowerCase();
  return {
    props: {
      news,
      project,
    },
  };
}

export default function Page({ news, project }) {
  const bgColor = project === "mmp" ? "bg-neutral-50" : "";
  return (
    <News bgColor={bgColor} {...news} project={project}>
      <div dangerouslySetInnerHTML={{ __html: news.contentHtml }} />
    </News>
  );
}
