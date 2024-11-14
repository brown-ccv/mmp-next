import {Component} from "react";
import {Layout} from "../../layouts/Layout";
import DataForm from "../../components/DataForm";
import { attributes, react as DataContent } from "../../content/pages/data.md"

export default class DataPage extends Component {
  render() {
    let { title } = attributes
    return (
        <Layout title={title} description="Data files and information">
          <section className="space-y-8 readable pb-12">
            <DataContent />
          </section>
          <DataForm />
        </Layout>)
  }
}