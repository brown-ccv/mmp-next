import {Layout} from "../../layouts/Layout"
import PublicationSection from "../../components/Publications"
import {getPublications} from "../../lib/markdown";

export async function getStaticProps() {
    const pubs = getPublications();
    return {
        props: {
            pubs: JSON.parse(JSON.stringify(pubs))
        },
    };
}

export default function PublicationPage({ pubs }) {
    const data = pubs.map(pub => pub)
    return (
        <Layout title="Publications" description="Publications associated with MMP">
          <PublicationSection publications={data} />
        </Layout>)

}