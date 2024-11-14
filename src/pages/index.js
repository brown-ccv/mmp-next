import { GlobeIcon, Pencil1Icon, TargetIcon } from "@radix-ui/react-icons"
import {Home} from "../layouts/Home"
import MiniMapSvg from "../components/svg/MiniMaps"
import FootPrint from "../components/svg/FootPrint"
import {ProjectAim} from "../components/ProjectAim"
import { attributes, react as HomeContent } from "../content/pages/home.md"
import {Component} from "react";

export default class HomePage extends Component {
  render() {
    let { title } = attributes
    return (
        <Home
            title={title}
            description="Mesoamerican Migration Project"
            lede="Furthering understanding of Mexican migration to the United States"
        >
          <div className="hidden xl:block absolute top-24 left-12">
            <FootPrint />
          </div>
          <div className="space-y-24">
            <section className="space-y-8 readable">
              <HomeContent />
            </section>
            <section className="space-y-12">
              <h3 className="title font-semibold">Project Aims</h3>
              <div className="flex flex-wrap gap-20 justify-center">
                <ProjectAim color="blue">
                  <TargetIcon slot="icon" height={36} width={36} />
                  Gather and maintain high quality data on Mexican migration to the US.
                </ProjectAim>
                <ProjectAim color="primary">
                  <GlobeIcon slot="icon" height={36} width={36} />
                  Make data public and confidential.
                </ProjectAim>
                <ProjectAim color="brown">
                  <Pencil1Icon slot="icon" height={36} width={36} />
                  Investigate the evolving transnational dynamics of migration.
                </ProjectAim>
              </div>
            </section>
            <section className="space-y-12 readable">
              <h3 className="title font-semibold">Where are we located?</h3>
              <p>
                The MMP has offices, in Mexico, at the Departamento de Investigacion sobre Movimientos
                Sociales of the University of Guadalajara and, in the United States, at the Office of
                Population Research of Princeton University. To contact our offices in Mexico or the United
                States, please contact us at the following addresses or email us:
              </p>
              <div className="flex justify-end">
                <MiniMapSvg />
              </div>
            </section>
          </div>
        </Home>)
  }
}