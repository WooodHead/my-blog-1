import Head from "next/head";
import { blogPosts, Post } from "../../lib/data";

export default function BlogPage(post: Post | null) {
	return (
		<div>
			<Head>
				<title>
					{post?.title}
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				{post?.content}
			</main>
		</div>
	)
}

export async function getStaticProps(context: { params?: { slug?: string } }) {
	const slug = context?.params?.slug
	const post = blogPosts.find((post) => post.slug === slug);
	return {
		props: post,
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