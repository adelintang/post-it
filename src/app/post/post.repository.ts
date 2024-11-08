import type { QueryParams } from '../../interface'
import type { Post } from '../../prisma/client'
import { db, generateUUID } from '../../utils'

export const createPost = async (post: Post) => {
	return db.post.create({
		data: {
			id: `post-${generateUUID()}`,
			content: post.content,
			user_id: post.user_id,
		},
	})
}

export const getPosts = async (query: QueryParams) => {
	const { search = '', page = '1', perPage = '10' } = query
	return db.post.findMany({
		where: {
			content: {
				contains: search.trim(),
				mode: 'insensitive',
			},
		},
		include: {
			user: {
				include: {
					profile: {
						include: {
							profileImage: true,
						},
					},
				},
			},
		},
		skip: (Number(page) - 1) * Number(perPage),
		take: Number(perPage),
	})
}

export const getPostsCount = async (query: QueryParams) => {
	const { search = '' } = query
	return db.post.count({
		where: {
			content: {
				contains: search.trim(),
				mode: 'insensitive',
			},
		},
	})
}

export const getPost = async (postId: string) => {
	return db.post.findUnique({
		where: {
			id: postId,
		},
		include: {
			user: {
				include: {
					profile: {
						include: {
							profileImage: true,
						},
					},
				},
			},
		},
	})
}

export const updatePost = async (postId: string, post: Post) => {
	return db.post.update({
		where: {
			id: postId,
		},
		data: {
			...post,
		},
	})
}

export const deletePost = async (postId: string) => {
	return db.post.delete({
		where: {
			id: postId,
		},
	})
}
