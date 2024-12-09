import Card from "./Card"
import React from "react";
import {PeopleData} from "../lib/markdown";

interface ContainerProps {
  people: PeopleData[]
  color: string
    title: string
}


export const CardContainer: React.FC<ContainerProps> = ({color, title, people
        }) => {
  return (<div className="flex flex-col xl:flex-row items-start gap-12">
        <h2 className={`${color} xl:[writing-mode:vertical-lr] xl:rotate-180 xl:w-9 xl:-ml-[5.25rem]`}>
          {title}
        </h2>
        <div className="flex flex-col gap-20 flex-1">
          {
            people.map((person: PeopleData, i: number) => {
              return (
                  <div key={person.link}>
                    <Card
                        position={i}
                        title={person.title}
                        name={person.name}
                        link={person.link}
                        image={person.avatar}
                        institution={person.org}
                        bio={person.bio}
                    />
                  </div>
              )
            })
          }
        </div>
      </div>
  )
    }

