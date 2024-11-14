import {Component} from "react";
import {Layout} from "../../layouts/Layout"
import { attributes, react as StudyContent } from "../../content/pages/study-design.md"
import Image from "next/image"

export default class HomePage extends Component {
  render() {
    let { title } = attributes
    return (
        <Layout title={title} description="Mesoamerican Migration Project">
          <div className="flex flex-col gap-6">
            <section className="flex flex-col gap-3.5">
              <Image src="/images/MMP_Map.jpg" alt="" />
            </section>
            <section className="readable space-y-4">
              <StudyContent />
            </section>
          </div>
        </Layout>)
  }
}