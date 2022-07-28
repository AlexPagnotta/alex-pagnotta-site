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

type PlaygroundPostPreview = Omit<
  PlaygroundPostData['frontmatter'],
  'publishDate'
> & {
  url?: string
  publishDate: Date
}

export const getPlaygroundPostPreviews = async (): Promise<
  PlaygroundPostPreview[]
> => {
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

  return posts.sort((a, b) => {
    return compareDesc(a.publishDate, b.publishDate)
  })
}
