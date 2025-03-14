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
  return {
    props: {
      news,
    },
  };
}

export default function Page({ news }) {
  return (
    <News {...news}>
      <div dangerouslySetInnerHTML={{ __html: news.contentHtml }} />
    </News>
  );
}
