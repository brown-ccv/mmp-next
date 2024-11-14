
import {Layout} from "../../layouts/Layout"
import ActivityPage from "../../components/ActivityPage"
import {Component} from "react";

export default class Activity extends Component {
    render() {
      return (
          < Layout
              title = "Activity"
              description = "History Table of Downloads" >
            < ActivityPage/>
          < /Layout>)
    }
  }