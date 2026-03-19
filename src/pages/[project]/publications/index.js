import { Layout } from "@/layouts/Layout";
import PublicationSection from "@/components/Publications";
import { getPublications } from "@/lib/markdown";

export async function getStaticPaths() {
  return {
    paths: [{ params: { project: "mmp" } }, { params: { project: "lamp" } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const pubs = getPublications();
  const project = context.params.project.toLowerCase();
  return {
    props: {
      pubs: JSON.parse(JSON.stringify(pubs)),
      project: project,
    },
  };
}

export default function PublicationPage({ pubs, project }) {
  const data = pubs.map((pub) => pub);

  return (
    <Layout
      title="Publications"
      description={`Publications associated with ${project.toUpperCase()}`}
      bgColor={project === "mmp" && "bg-neutral-50"}
      project={project.toUpperCase()}
    >
      <PublicationSection publications={data} project={project.toUpperCase()} />
    </Layout>
  );
}
