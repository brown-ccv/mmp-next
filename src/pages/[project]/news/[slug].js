import { News } from "@/layouts/News";
import { getNewsArticleIds, getNewsArticle } from "@/lib/markdown";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const bgColor = router.query.project === "mmp" ? "bg-neutral-50" : "";
  return (
    <News bgColor={bgColor} {...news}>
      <div dangerouslySetInnerHTML={{ __html: news.contentHtml }} />
    </News>
  );
}
