import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type Classification = "Book" | "Article" | "Dissertation" | "Chapter"

export interface PostData {
    slug: string;
    title: string;
    description: string;
    date: string; // Use Date type if you want to work with Date objects
    thumbnail?: string; // Optional
    author: string;
    body: string; // The actual content of the post
}

export interface PeopleData {
    slug: string
    type: string
    title: string
    name: string
    link: string
    avatar: string
    institution: string
    bio: string
}

export interface PublicationData {
    slug: string
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

const postsDirectory = path.join(process.cwd(), "content/posts");
const peopleDirectory = path.join(process.cwd(), "content/people");
const publicationsDirectory = path.join(process.cwd(), "content/publications");

export function getSortedPostsData(): PostData[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData: PostData[] = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            slug,
            ...data,
            date: data.date instanceof Date ? data.date.toISOString() : data.date,
        } as PostData;
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => ({
        params: {
            slug: fileName.replace(/\.md$/, ""), // Removing .md extension
        },
    }));
}

export function getPostData(slug: string): PostData {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
        slug,
        ...matterResult.data,
        date: matterResult.data.date instanceof Date ? new Date(matterResult.data.date).toISOString() : matterResult.data.date,
        body: matterResult.content,
    } as PostData;
}

export function getPeopleData(slug: string): PeopleData {
    const fullPath = path.join(peopleDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
        slug,
        ...matterResult.data,
    } as PeopleData;
}

export function getTypePeopleData(type: string): PeopleData[] {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPeopleData: PeopleData[] = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
            slug,
            ...data,
        } as PeopleData;
    });
    return allPeopleData.filter((person) => person.type === type)
}

export function getPublications(): PublicationData[] {
    const fileNames = fs.readdirSync(publicationsDirectory);
    return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const {data} = matter(fileContents);

        return {
            slug,
            ...data,
        } as PublicationData;
    });
}