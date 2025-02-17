import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from 'remark';
import html from 'remark-html';

export type Classification = "Book" | "Article" | "Dissertation" | "Chapter"
export type Tag = "MMP" | "LAMP"

export interface PeopleData {
    type: string
    title: string
    name: string
    link: string
    avatar: string
    org: string
    bio: string
}

export interface PublicationData {
    classification: string
    tags: Array<string>
    pubDate: Date
    author: string
    citation: string
    feature: boolean
    url?: string
    pdf?: string
    image?: string
}

export interface NewsData {
    slug: string
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
const newsDirectory = path.join(process.cwd(), "src/content/news");

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

export function getNews(): NewsData[] {
    const fileNames = fs.readdirSync(newsDirectory);
    return fileNames.map((fileName) => {
        const fullPath = path.join(newsDirectory, fileName);
        const slug = fileName.replace(/\.md$/, "");
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const {data} = matter(fileContents);

        return {
            slug,
            ...data,
        } as NewsData;
    });
}

export function getNewsArticleIds() {
    const fileNames = fs.readdirSync(newsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getNewsArticle(slug: string) {
    const fullPath = path.join(newsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        slug,
        contentHtml,
        ...matterResult.data,
    };
}