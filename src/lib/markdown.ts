import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type Classification = "Book" | "Article" | "Dissertation" | "Chapter"

export interface PeopleData {
    type: string
    title: string
    name: string
    link: string
    avatar: string
    institution: string
    bio: string
}

export interface PublicationData {
    classification: string
    pubDate: Date
    author: string
    citation: string
    feature: boolean
    url?: string
    pdf?: string
    image?: string
}

export interface NewsData {
    title: string
    description: string
    pubDate: Date
    updatedDate?: Date
    heroImage?: string
}

export interface FileData {
    title: string
    description?: string
    version?: string
    cat: string
    codebookType?: string
    file?: string
    archivo?: string
}

const peopleDirectory = path.join(process.cwd(), "src/content/people");
const publicationsDirectory = path.join(process.cwd(), "src/content/publications");
const filesDirectory = path.join(process.cwd(), "src/content/data");

export function getAllFileData(): FileData[] {
    const fileNames = fs.readdirSync(filesDirectory);
    const index = fileNames.indexOf("files");
    fileNames.splice(index, 1);
    const allFiles = fileNames.map((fileName) => {
        const fullPath = path.join(filesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const {data} = matter(fileContents);

        return {
            ...data
        } as FileData
    })
    return allFiles
}

export function getPeopleData(): PeopleData[] {
    const fileNames = fs.readdirSync(peopleDirectory);
    return fileNames.map((fileName) => {
        const fullPath = path.join(peopleDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const {data} = matter(fileContents);

        return {
            ...data
        } as PeopleData;
    })
}

export function getTypePeopleData(type: string): PeopleData[] {
    const fileNames = fs.readdirSync(peopleDirectory);
    const allPeopleData: PeopleData[] = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(peopleDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            ...data,
        } as PeopleData;
    });
    return allPeopleData.filter((person) => person.type === type)
}

export function getPublications(): PublicationData[] {
    const fileNames = fs.readdirSync(publicationsDirectory);
    return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(publicationsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const {data} = matter(fileContents);

        return {
            ...data,
        } as PublicationData;
    });
}