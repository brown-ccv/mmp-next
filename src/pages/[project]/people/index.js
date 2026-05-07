import { Layout } from "@/layouts/Layout";
import { CardContainer } from "@/components/CardContainer";
import { getPeopleData } from "@/lib/markdown";

export async function getStaticPaths() {
  return {
    paths: [{ params: { project: "mmp" } }, { params: { project: "lamp" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const people = getPeopleData();
  const project = params.project;
  return {
    props: {
      people: JSON.parse(JSON.stringify(people)),
      project,
    },
  };
}

export default function PeoplePage({ people, project }) {
  const shownPeople = people.filter(
    (item) => project && item.tags.includes(project.toUpperCase()),
  );

  const leadership = shownPeople.filter(
    (person) => person.type === "Leadership",
  );
  const advisors = shownPeople.filter((person) => person.type === "Advisors");
  const support = shownPeople.filter(
    (person) => person.type === "Supporting Staff",
  );

  return (
    <Layout
      title="Staff"
      description="Our Leadership, Advisors, and Staff"
      bgColor={project === "mmp" && "bg-neutral-50"}
      project={project}
    >
      <div className="flex flex-col space-y-28">
        <CardContainer
          title="Leadership"
          color="text-secondary-blue-500"
          people={leadership}
        />
        <CardContainer
          title="Advisors"
          color="text-primary-500"
          people={advisors}
        />
        <CardContainer
          title="Supporting Staff"
          color="text-secondary-brown-500"
          people={support}
        />
      </div>
    </Layout>
  );
}
