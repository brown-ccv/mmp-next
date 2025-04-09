import { Component } from "react";
import { Layout } from "@/layouts/Layout";
import {
  attributes,
  react as StudyContentMmp,
} from "@/content/pages/mmp-study-design.md";
import {
  attributes as lampAttributes,
  react as StudyContentLamp,
} from "@/content/pages/lamp-study-design.md";
import Image from "next/image";
import { withRouter } from "next/router";

class StudyDesignPage extends Component {
  projectConfigs = {
    mmp: {
      attributes: attributes,
      description: "Mesoamerican Migration Project",
      map: "/images/MMP_Map.jpg",
      bgColor: "bg-neutral-50",
      StudyContent: StudyContentMmp,
    },
    lamp: {
      attributes: lampAttributes,
      description: "Latin American Migration Project",
      map: "/images/LAMP_Map.jpg",
      StudyContent: StudyContentLamp,
    },
  };
  render() {
    if (this.props.router.isReady) {
      const project = this.props.router.query.project;
      const { attributes, description, map, bgColor, StudyContent } =
        this.projectConfigs[project];
      const { title } = attributes
      return (
        <Layout title={title} description={description}>
          <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-3.5">
              <Image src={map} alt="" width="600" height="600" />
            </section>
            <section className="readable space-y-4">
              <StudyContent />
            </section>
          </div>
        </Layout>
      );
    }
  }
}

export default withRouter(StudyDesignPage);
