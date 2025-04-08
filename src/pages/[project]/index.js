import { GlobeIcon, Pencil1Icon, TargetIcon } from "@radix-ui/react-icons";
import { ProjectHome } from "@/layouts/ProjectHome";
import MiniMapSvg from "@/components/svg/MiniMaps";
import FootPrint from "@/components/svg/FootPrint";
import { ProjectAim } from "@/components/ProjectAim";
import { react as MmpContent } from "@/content/pages/mmp-home.md";
import { react as LampContent } from "@/content/pages/lamp-home.md";
import { attributes as mmpAttributes } from "@/content/aims/mmp-aims.md"
import { Component } from "react";
import { withRouter } from "next/router";

class HomePage extends Component {
  projectConfigs = {
    mmp: {
      title: "MMP",
      description: "Mesoamerican Migration Project",
      lede: "Furthering understanding of Mexican and Central American migration to the United States",
      bgColor: "bg-neutral-50",
      HomeContent: MmpContent,
      attributes: mmpAttributes
    },
    lamp: {
      title: "LAMP",
      description: "Latin American Migration Project",
      lede: "Furthering understanding of Latin American migration to the United States",
      HomeContent: LampContent,
    },
  };

  render() {
    if (this.props.router.isReady) {
      const project = this.props.router.query.project;
      const { title, description, lede, bgColor, HomeContent, attributes } =
        this.projectConfigs[project];
      const { aim1, aim2, aim3 } = attributes;
      return (
        <ProjectHome
          title={title}
          project={project}
          description={description}
          lede={lede}
          bgColor={bgColor}
        >
          <div className="hidden xl:block absolute top-24 left-4 2xl:left-12">
            <FootPrint />
          </div>
          <div className="space-y-24">
            <section className="space-y-8 readable">
              <HomeContent />
            </section>
            <section className="space-y-12">
              <h3 className="title font-semibold">Project Aims</h3>
              <div className="flex flex-wrap gap-20 justify-center">
                <ProjectAim
                  color="blue"
                  icon={<TargetIcon slot="icon" height={36} width={36} />}
                >
                  {aim1}
                </ProjectAim>
                <ProjectAim
                  color="primary"
                  icon={<GlobeIcon slot="icon" height={36} width={36} />}
                >
                  {aim2}
                </ProjectAim>
                <ProjectAim
                  color="brown"
                  icon={<Pencil1Icon height={36} width={36} />}
                >
                  {aim3}
                </ProjectAim>
              </div>
            </section>
            <section className="space-y-12 readable">
              <h3 className="title font-semibold">Where are we located?</h3>
              <p>
                The MMP has offices, in Mexico, at the Centro de Estudios
                Demográficos, Urbanos y Ambientales (CEDUA) of El Colegio de
                México in Mexico City, and in the United States, at the
                Population Studies and Training Center (PSTC) of Brown
                University. To contact our offices in Mexico or the United
                States, please contact us at the following emails:
              </p>
              <div className="flex justify-end">
                <MiniMapSvg />
              </div>
            </section>
          </div>
        </ProjectHome>
      );
    }
  }
}

export default withRouter(HomePage);
