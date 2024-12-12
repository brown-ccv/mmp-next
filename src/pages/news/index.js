import {Layout} from "../../layouts/Layout"
import {FormattedDate} from "../../components/FormattedDate"
import {getNews} from "../../lib/markdown";

export async function getStaticProps() {
  const news = getNews();
  return {
    props: {
      news: JSON.parse(JSON.stringify(news))
    },
  };
}

export default function NewsPage({ news }) {
    const posts = news.sort(
        (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
    )
  return (

      <Layout title="News" description="Recent news about MMP">
        <ul className="flex flex-col items-start gap-6">
          {
            posts.map((post) => {
                if (post.heroImage) {
                    post.heroImage = post.heroImage.replace("/public", "")
                }
                return(
                    <li key={post.slug} className="flex gap-10">
                        <a className="relative hidden w-80 h-72 flex-none md:block" href={`/news/${post.slug}/`}>
                            <img className="object-cover h-full w-full" src={post.heroImage} alt=""/>
                        </a>
                        <div className="grow space-y-1">
                            <a href={`/news/${post.slug}/`}>
                                <h3 className="font-medium underline">{post.title}</h3>
                            </a>
                            <p>{post.description}</p>
                        </div>
                    </li>
                )
            })
          }
        </ul>
      </Layout>

  )

}

