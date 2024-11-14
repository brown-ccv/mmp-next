import React, { useState } from "react"
import Select, { type SingleValue } from "react-select"
import { Form } from "@radix-ui/react-form"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import Image from "next/image";
import type { Classification } from "@/util/markdown"
import PubPlaceholder from "./svg/PubPlaceholder"
import { Input } from "./Input"
import {PublicationData} from "@/util/markdown";

interface PubProps {
  publications: PublicationData[]
}

const PublicationSection: React.FC<PubProps> = ({ publications }) => {
  const classificationOptions = [
    { value: "Book", label: "Books" },
    {
      value: "Article",
      label: "Articles",
    },
    { value: "Dissertation", label: "Dissertations" },
    { value: "Chapter", label: "Chapters" },
  ] as const

  const [searchInput, setSearchInput] = useState("")
  const [classificationFilter, setClassificationFilter] = useState<
    SingleValue<Readonly<{ value: Classification; label: string }>>
  >({ value: "Book", label: "Books" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  const featuredPubs = publications.filter((pub) => pub.feature)

  const shownPubs = publications.filter(
    (pub) =>
      classificationFilter &&
      classificationFilter.value.includes(pub.classification) &&
      pub.citation.toLowerCase().includes(searchInput.toLowerCase())
  )

  const categoryByYear: Record<string, PublicationData[]> = shownPubs.reduce(
    (pub, i) => {
      const key = i.pubDate.toISOString().substring(0, 4)
      pub[key] = pub[key] ?? []
      pub[key].push(i)
      return pub
    },
    {} as Record<string, PublicationData[]>
  )
  const pubsByYear = Object.entries(categoryByYear).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  )

  return (
    <>
      <section className="flex flex-col gap-6">
        <h2>Featured Publications</h2>
        <div className="md:grid-cols-2 grid grid-cols-1 gap-2">
          {featuredPubs.map((publication, i) => {
            return (
              <div key={i} className="">
                <div className="flex flex-col gap-8">
                  <p>{publication.citation}</p>
                  {publication.pdf && (
                    <a
                      className="bg-neutral-500 text-neutral-50 px-7 w-max py-3 no-underline rounded-full"
                      href={publication.pdf}
                    >
                      View PDF
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <Form className="lg:flex-row flex flex-col justify-center gap-4 my-24">
        <div>
          <Input
            label="Search for a publication"
            name="pubQuery"
            icon={<MagnifyingGlassIcon className="w-full h-full" />}
            placeholder="Durand, Jorge..."
            value={searchInput}
            onChange={handleChange}
            className="md:min-w-96"
          />
        </div>
        <div className="space-y-2">
          <label className="pl-1" htmlFor="classification">
            Show
          </label>
          <Select
            id="classification"
            options={classificationOptions}
            isSearchable={false}
            defaultValue={classificationFilter}
            unstyled
            className="cursor-pointer"
            classNames={{
              container: () =>
                "cursor-pointer bg-white rounded-full shadow-inner min-w-60 w-max py-3 px-5",
              placeholder: () => "cursor-pointer text-neutral-300",
              indicatorsContainer: () => "cursor-pointer text-neutral-300 hover:bg-neutral-200",
              multiValueRemove: () => "hover:bg-neutral-100",
              valueContainer: () => "gap-2 cursor-pointer",
              multiValue: () =>
                "cursor-pointer flex items-center gap-2 text-primary-500 bg-neutral-50 px-2 rounded-lg",
              menu: () => "cursor-pointr rounded-lg bg-white p-2",
              // See CSS file for other overrides
              option: () => "rounded-sm p-1 hover:text-primary-500 hover:bg-neutral-50",
            }}
            styles={{
              control: (baseStyles) => ({ ...baseStyles, minHeight: 0 }),
              option: (baseStyles) => ({ ...baseStyles, cursor: "pointer" }),
            }}
            onChange={(option) => setClassificationFilter(option)}
          />
        </div>
      </Form>

      {pubsByYear && (
        <section className="flex flex-col gap-6">
          {classificationOptions.map((option) => {
            if (classificationFilter && classificationFilter.label === option.label) {
              return (
                <article key={option.value}>
                  <h2 className="mb-10">{option.label}</h2>
                  <div className="">
                    {pubsByYear.map((cat, i) => {
                      return (
                        <div key={i} className="flex flex-col gap-6 py-6">
                          <h3 className="font-bold">{cat[0]}</h3>
                          {cat[1].map((pub) => {
                            return (
                              <div
                                key={pub.citation}
                                className={
                                  option.label === "Books" ? "flex gap-8 content-start" : "gap-8"
                                }
                              >
                                {option.label === "Books" && (
                                  <div className="md:block shadow-book-shadow h-72 flex-none hidden w-40">
                                    {pub.image ? (
                                      <Image
                                        className="flex-none object-cover w-full h-full"
                                        src={pub.image}
                                        alt=""
                                      />
                                    ) : (
                                      <PubPlaceholder />
                                    )}
                                  </div>
                                )}

                                <div className="flex flex-col gap-4">
                                  <p>{pub.citation}</p>
                                  {pub.pdf && (
                                    <div className={option.label === "Books" ? "" : "ml-2"}>
                                      <a
                                        className="bg-neutral-500 text-neutral-50 px-7 w-max py-3 no-underline rounded-full"
                                        href={pub.pdf}
                                      >
                                        View PDF
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </article>
              )
            }
          })}
        </section>
      )}
    </>
  )
}

export default PublicationSection
