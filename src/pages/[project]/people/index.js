import { useRouter } from 'next/router';

import { Layout } from "@/layouts/Layout";
import { CardContainer } from "@/components/CardContainer";
import { getPeopleData } from "@/lib/markdown";


export async function getStaticPaths() {
  return { paths: [{params: {project: "mmp"}}, {params: {project: "lamp"}}], fallback: false}
}

export async function getStaticProps() {
  const people = getPeopleData();
  return {
    props: {
      people: JSON.parse(JSON.stringify(people)),
    },
  };
}

export default function PeoplePage({ people }) {
  const router = useRouter();

  const shownPeople = people.filter(
    (item) =>
      router.query.project && item.tags.includes(router.query.project.toUpperCase())
  )

  const leadership = shownPeople.filter((person) => person.type === "Leadership");
  const advisors = shownPeople.filter((person) => person.type === "Advisors");
  const support = shownPeople.filter((person) => person.type === "Supporting Staff");

  return (
    <Layout title="Staff" description="Our Leadership, Advisors, and Staff" bgColor={router.query.project==="mmp" && "bg-neutral-50"}>
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
