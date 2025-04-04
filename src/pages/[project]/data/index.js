import { Component } from "react";
import { Layout } from "@/layouts/Layout";
import DataForm from "@/components/DataForm";
import { attributes, react as DataContent } from "@/content/pages/mmp-data.md";

export default class DataPage extends Component {
  render() {
    let { title } = attributes;
    return (
      <Layout title={title} description="Data files and information">
        <section className="space-y-8 readable pb-12">
          <DataContent />
        </section>
        <section className="pb-8">
          <div className="space-y-8">
            <h2>
              By submitting this form, you agree with the following statements:
            </h2>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                I will use the MMP data only for research and/or educational
                purposes
              </li>
              <li>
                I will not try to identify any individual, household or migrant
                community
              </li>
              <li>
                I will not give access to my copy of the MMP data to anyone who
                does not agree to respect these confidentiality terms
              </li>
            </ul>
          </div>
        </section>
        <DataForm />
      </Layout>
    );
  }
}
