import { Home } from "../layouts/Home";
import MiniMapSvg from "../components/svg/MiniMaps";
import FootPrint from "../components/svg/FootPrint";
import MmpLogo from "@/assets/mmp-logo";
import LampLogo from "@/assets/lamp-logo";
import { Component } from "react";


const projectConfig = [
  {
    title: "MMP",
    href: "/mmp",
    Logo: MmpLogo,
    description: "Mesoamerican Migration Project",
    lede: "Furthering understanding of Mexican and Central American migration to the United States",
    body: "The Mesoamerican Migration Project (MMP) is a continuation and expansion of the Mexican Migration Project which was created in 1982 by an interdisciplinary team of researchers to further our understanding of the complex process of Mexican migration to the United States. The Mesoamerican Migration Project collects and analyzes data on migration from Mexico, El Salvador, Guatemala and Honduras to the United States.",
  },
  { title: "LAMP",href:"/lamp", Logo: LampLogo, description: "Latin American Migration Project", lede: "Furthering understanding of Latin American migration to the United States",
    body: "The Latin American Migration Project (LAMP) is a multidisciplinary research effort between investigators in various countries of Latin America and the United States. LAMP is currently based at Brown University and the University of Guadalajara."
  }
];
export default class HomePage extends Component {
  
  render() {
    return (
      <Home
        config={projectConfig}
      >
        <div className="hidden xl:block absolute top-24 left-4 2xl:left-12">
          <FootPrint />
        </div>
      </Home>
    );
  }
}
