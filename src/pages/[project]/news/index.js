import { Layout } from "@/layouts/Layout";
import { getNews } from "@/lib/markdown";

export async function getStaticPaths() {
  return {
    paths: [{ params: { project: "mmp" } }, { params: { project: "lamp" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const news = getNews();
  const project = params.project;
  return {
    props: {
      news: JSON.parse(JSON.stringify(news)),
      project,
    },
  };
}

export default function NewsPage({ news, project }) {
  const shownNews = news.filter((item) =>
    item.tags.includes(project.toUpperCase()),
  );

  const posts = shownNews
    .map((item) => ({
      ...item,
      pubDate: new Date(item.pubDate),
    }))
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
  return (
    <Layout
      title="News"
      project={project}
      description={`Recent news about ${project}`}
      bgColor={project === "mmp" && "bg-neutral-50"}
    >
      <ul className="flex flex-col items-start gap-6">
        {posts.map((post) => {
          if (post.heroImage) {
            post.heroImage.src = post.heroImage.src.replace("/public", "");
          }
          return (
            <li key={post.slug} className="flex gap-10">
              <div
                className="relative hidden w-80 h-72 flex-none md:block"
                alt=""
              >
                {post.heroImage && (
                  <img
                    className="object-cover h-full w-full"
                    src={post.heroImage.src}
                    alt={post.heroImage.alt}
                  />
                )}
              </div>
              <div className="grow space-y-1">
                <a href={`/${project}/news/${post.slug}/`}>
                  <h2 className="font-medium underline">{post.title}</h2>
                </a>
                <p>{post.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
