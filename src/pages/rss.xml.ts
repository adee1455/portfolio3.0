import rss from '@astrojs/rss'
import siteConfig from '../site-config'
import { getPosts } from '../utils/posts'

interface Context {
  site: string
}

interface PostItem {
  data: {
    date: string // Adjust type as necessary
    // Add other properties from item.data if needed
  }
  slug: string
  body: string // Adjust type as necessary
}

export async function GET(context: Context) {
  const posts = await getPosts() as PostItem[] // Type assertion to PostItem[]

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((item: PostItem) => { // Specify the type of item
      return {
        ...item.data,
        link: `${context.site}/posts/${item.slug}/`,
        pubDate: new Date(item.data.date),
        content: item.body,
        author: `${siteConfig.author} <${siteConfig.email}>`,
      }
    }),
  })
}
