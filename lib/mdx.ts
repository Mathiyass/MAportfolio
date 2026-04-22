import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostBySlug(slug: string, type: 'blog' | 'projects') {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, type, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

export function getAllPosts(type: 'blog' | 'projects') {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) return [];
  
  const slugs = fs.readdirSync(dir);
  const posts = slugs
    .filter(slug => slug.endsWith('.mdx'))
    .map(slug => getPostBySlug(slug, type))
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));

  return posts;
}
