import { Component } from "react";
import { Layout } from "@/layouts/Layout";
import {
  attributes,
  react as StudyContent,
} from "@/content/pages/mmp-study-design.md";
import {
  attributes as lampAttributes,
  react as StudyContentLamp,
} from "@/content/pages/lamp-study-design.md";
import Image from "next/image";
import { withRouter } from "next/router";

class StudyDesignPage extends Component {
  render() {
    if (this.props.router.isReady) {
      const project = this.props.router.query.project;
      if (project === "mmp") {
        let { title } = attributes;

        return (
          <Layout title={title} description="Mesoamerican Migration Project">
            <div className="flex flex-col gap-6">
              <section className="flex flex-col gap-3.5">
                <Image
                  src="/images/MMP_Map.jpg"
                  alt=""
                  width="600"
                  height="600"
                />
              </section>
              <section className="readable space-y-4">
                <StudyContent />
              </section>
            </div>
          </Layout>
        );
      } else {
        // console.log(lampAttributes)
        console.log(StudyContentLamp);
        console.log();
        let { title } = lampAttributes;

        return (
          <Layout title={title} description="Latin American Migration Project">
            <div className="flex flex-col gap-6">
              <section className="flex flex-col gap-3.5">
                <Image
                  src="/images/LAMP_Map.jpg"
                  alt=""
                  width="600"
                  height="600"
                />
              </section>
              <section className="readable space-y-4">
                <StudyContentLamp />
              </section>
            </div>
          </Layout>
        );
      }
    }
  }
}

export default withRouter(StudyDesignPage);
