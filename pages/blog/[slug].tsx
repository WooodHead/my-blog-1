import Head from "next/head";
import { getAllPost, Post } from "../../lib/data";
import { getDateStr } from "../utils";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

interface MDXPost extends Post {
	mdxContent: MDXRemoteSerializeResult<Record<string, unknown>>;
}

export default function BlogPage(post: MDXPost) {
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
				<div className="prose"><MDXRemote {...post.mdxContent} /></div>
			</main>
		</div>
	)
}

export async function getStaticProps(context: { params?: { slug?: string } }) {
	const slug = context?.params?.slug
	const post = getAllPost().find((post) => post.slug === slug);
	const mdxSource = await serialize(post?.content ?? "");
	(post as MDXPost).mdxContent = mdxSource;
	return {
		props: post,
	}
}

export async function getStaticPaths() {
	getAllPost();
	return {
		paths:
			getAllPost().map((post) => ({
				params: {
					slug: post.slug
				}
			})),
		fallback: true // false or 'blocking'
	};
}