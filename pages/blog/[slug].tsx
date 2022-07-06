import Head from "next/head";
import { blogPosts, Post } from "../../lib/data";
import { getDateStr } from "../utils";

export default function BlogPage(props: { slug: string } | null) {
	const post = blogPosts.find((post) => post.slug === props?.slug);
	return (
		<div>
			<Head>
				<title>
					{post?.title}
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="space-y-2">
				<div className="border-b-2 border-gray-200">
					<div className="text-2xl font-bold">{post?.title}</div>
					<div className="text-gray-600">{post?.date && getDateStr(post?.date)}</div>
				</div>
				<div>{post?.content}</div>
			</main>
		</div>
	)
}

export async function getStaticProps(context: { params?: { slug?: string } }) {
	const slug = context?.params?.slug
	return {
		props: { slug },
	}
}

export async function getStaticPaths() {
	return {
		paths:
			blogPosts.map((post) => ({
				params: {
					slug: post.slug
				}
			})),
		fallback: true // false or 'blocking'
	};
}