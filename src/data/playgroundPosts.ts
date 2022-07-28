import { compareDesc } from 'date-fns'

import { parseMarkdownDate } from '../utils/dateUtils'

type PlaygroundPostData = {
  frontmatter: {
    title: string
    description?: string
    publishDate: string
    tags: string[]
  }
  url: string
}

type PlaygroundPostPreviewsParams = {
  limit?: number
}

type GetPlaygroundPostPreviewsResult = (Omit<
  PlaygroundPostData['frontmatter'],
  'publishDate'
> & {
  url?: string
  publishDate: Date
})[]

export const getPlaygroundPostPreviews = async ({
  limit,
}: PlaygroundPostPreviewsParams = {}): Promise<GetPlaygroundPostPreviewsResult> => {
  const postPromises = import.meta.glob<PlaygroundPostData>(
    '../pages/playground/*.md'
  )

  const posts = await Promise.all(
    Object.keys(postPromises).map((slug) => {
      const postPromise = postPromises[slug]

      return postPromise().then(({ frontmatter, url }) => {
        const publishDate = parseMarkdownDate(frontmatter.publishDate)

        return {
          title: frontmatter.title,
          description: frontmatter.description,
          publishDate,
          tags: frontmatter.tags,
          url,
        }
      })
    })
  )

  const sortedPosts = posts.sort((a, b) => {
    return compareDesc(a.publishDate, b.publishDate)
  })

  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}
