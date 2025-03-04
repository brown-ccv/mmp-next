import { Layout } from "@/layouts/Layout";
import { CardContainer } from "@/components/CardContainer";
import { getPeopleData } from "@/lib/markdown";

export async function getStaticProps() {
  const people = getPeopleData();
  return {
    props: {
      people: JSON.parse(JSON.stringify(people)),
    },
  };
}

export default function PeoplePage({ people }) {
  const leadership = people.filter((person) => person.type === "Leadership");
  const advisors = people.filter((person) => person.type === "Advisors");
  const support = people.filter((person) => person.type === "Supporting Staff");

  return (
    <Layout title="Staff" description="Our Leadership, Advisors, and Staff">
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
