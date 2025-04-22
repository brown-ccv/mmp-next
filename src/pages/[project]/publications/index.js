import { Layout } from "@/layouts/Layout";
import PublicationSection from "@/components/Publications";
import { getPublications } from "@/lib/markdown";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [{ params: { project: "mmp" } }, { params: { project: "lamp" } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  const pubs = getPublications();
  return {
    props: {
      pubs: JSON.parse(JSON.stringify(pubs)),
    },
  };
}

export default function PublicationPage({ pubs }) {
  const data = pubs.map((pub) => pub);
  const router = useRouter();
  const project = router.query.project;
  return (
    <Layout
      title="Publications"
      description={`Publications associated with ${project.toUpperCase()}`}
      bgColor={project === "mmp" && "bg-neutral-50"}
    >
      <PublicationSection publications={data} project={project.toUpperCase()} />
    </Layout>
  );
}
