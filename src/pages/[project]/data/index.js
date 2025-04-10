import { Component } from "react";
import { Layout } from "@/layouts/Layout";
import DataForm from "@/components/DataForm";
import {
  attributes as mmpAttributes,
  react as MmpDataContent,
} from "@/content/pages/mmp-data.md";
import {
  attributes as lampAttributes,
  react as LampDataContent,
} from "@/content/pages/lamp-data.md";
import { withRouter } from "next/router";

class DataPage extends Component {
  projectConfigs = {
    mmp: {
      bgColor: "bg-neutral-50",
      DataContent: MmpDataContent,
      attributes: mmpAttributes,
    },
    lamp: {
      bgColor: "",
      DataContent: LampDataContent,
      attributes: lampAttributes,
    },
  };

  render() {
    if (this.props.router.isReady) {
      const project = this.props.router.query.project;

      const { attributes, bgColor, DataContent } = this.projectConfigs[project];
      const { title } = attributes;
      return (
        <Layout
          title={title}
          description="Data files and information"
          bgColor={bgColor}
        >
          <section className="space-y-8 readable pb-12">
            <DataContent />
          </section>
          <section className="pb-8">
            <div className="space-y-8">
              <h2>
                By submitting this form, you agree with the following
                statements:
              </h2>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  I will use this data only for research and/or educational
                  purposes
                </li>
                <li>
                  I will not try to identify any individual, household or
                  migrant community
                </li>
                <li>
                  I will not give access to my copy of this data to anyone who
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
}

export default withRouter(DataPage);
