import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getDateStr } from "../pages/utils";

const contentDirectory = path.join(process.cwd(), '_content');
let allPost: Post[] | null;

export function getAllPost(): Post[] {
	const allPosts = fs.readdirSync(contentDirectory);
	allPost = allPost ?? allPosts.map(fileName => {
		const slug = fileName.replace('.md', '');
		const fileContents = fs.readFileSync(
			path.join(contentDirectory, fileName),
			'utf-8'
		);
		const { data, content } = matter(fileContents)
		return {
			date: getDateStr(data.date) ?? "",
			title: data.title ?? "",
			content,
			slug,
		}
	})
	return allPost;
}

export interface Post {
	title: string;
	content: string;
	date: string;
	slug: string;
}