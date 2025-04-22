import { Layout } from "@/layouts/Layout";
import { ReaderIcon } from "@radix-ui/react-icons";
import {
  attributes as mmpAttributes,
  react as MmpDocContent,
} from "@/content/pages/mmp-documentation.md";
import {
  attributes as lampAttributes,
  react as LampDocContent,
} from "@/content/pages/lamp-documentation.md";
import DocumentationTable from "@/components/DocumentationTable";
import { getAllFileData } from "@/lib/markdown";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [{ params: { project: "mmp" } }, { params: { project: "lamp" } }],
    fallback: false,
  };
}

export async function getStaticProps() {
  const allFiles = getAllFileData();
  return {
    props: {
      allFiles,
    },
  };
}

const projectConfigs = {
  mmp: {
    attributes: mmpAttributes,
    DocContent: MmpDocContent,
    bgColor: "bg-neutral-50",
  },
  lamp: { attributes: lampAttributes, DocContent: LampDocContent },
};

export default function DocPage({ allFiles }) {
  const router = useRouter();
  const project = router.query.project;
  const { attributes, DocContent, bgColor } = projectConfigs[project];
  let { title } = attributes;

  const files = allFiles.map((file) => ({
    ...file,
    archivo: file.archivo?.replace("/public", ""),
    file: file.file?.replace("/public", ""),
  }));
  const codebooks = files.filter((file) => file.cat === "Codebook");
  const core = codebooks.filter((file) => file.codebookType === "MMP Core");
  const community = codebooks.filter(
    (file) => file.codebookType === "Community Level Supplementary",
  );
  const state = codebooks.filter(
    (file) => file.codebookType === "State Level Supplementary",
  );
  const national = codebooks.filter(
    (file) => file.codebookType === "National Level Supplementary",
  );
  const appendix = files.filter((file) => file.cat === "Appendices");
  const questionnaire = files.filter((file) => file.cat === "Questionnaire");

  return (
    <Layout title={title} description="About the Project" bgColor={bgColor}>
      <section className="space-y-8 readable pb-12">
        <DocContent />
        <Link
          href={`/${project}/study-design`}
          className="flex gap-2 items-end text-primary-500 decoration-primary-500 font-bold mt-6 mb-10"
        >
          <ReaderIcon width="24" height="24" />
          <span> Read the study design </span>
        </Link>
      </section>
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="pb-5">Codebooks</h2>
          <DocumentationTable allFiles={core} showHeader />
          <h3 className="font-semibold">Community Level Supplementary Files</h3>
          <DocumentationTable allFiles={community} />
          <h3 className="font-semibold">State Level Supplementary Files</h3>
          <DocumentationTable allFiles={state} />
          <h3 className="font-semibold">National Level Supplementary Files</h3>
          <DocumentationTable allFiles={national} />
        </div>
        <div>
          <h2 className="pb-5">Appendices</h2>
          <DocumentationTable allFiles={appendix} showHeader />
        </div>
        <div>
          <h2 className="pb-5">Questionnaires</h2>
          <DocumentationTable allFiles={questionnaire} version showHeader />
        </div>
      </section>
    </Layout>
  );
}
