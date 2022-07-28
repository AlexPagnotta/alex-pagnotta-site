import { compareDesc, format } from 'date-fns'

import { parseMarkdownDate } from '../utils/dateUtils'

type PostData = {
  frontmatter: {
    title: string
    description?: string
    publishDate: string
  }
  url: string
}

type GetPostPreviewsParams = {
  limit?: number
}

type GetPostPreviewsResult = (Omit<PostData['frontmatter'], 'publishDate'> & {
  url?: string
  publishDate: Date
  publishDateMonth: string
  publishDateYear: string
})[]

export const getPostPreviews = async ({
  limit,
}: GetPostPreviewsParams = {}): Promise<GetPostPreviewsResult> => {
  const postPromises = import.meta.glob<PostData>('../pages/blog/*.md')

  const posts = await Promise.all(
    Object.keys(postPromises).map((slug) => {
      const postPromise = postPromises[slug]

      return postPromise().then(({ frontmatter, url }) => {
        const publishDate = parseMarkdownDate(frontmatter.publishDate)

        return {
          title: frontmatter.title,
          description: frontmatter.description,
          publishDate,
          publishDateMonth: format(publishDate, 'MM'),
          publishDateYear: format(publishDate, 'yyyy'),
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
