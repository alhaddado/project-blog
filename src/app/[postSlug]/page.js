import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from "@/helpers/file-helpers"
import { MDXRemote } from 'next-mdx-remote/rsc'
import CodeSnippet from "@/components/CodeSnippet"
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo"
import CircularColorsDemo from "@/components/CircularColorsDemo"

export async function generateMetadata({ params: { postSlug }}) {
  const post = await loadBlogPost(postSlug);

  return {
    title: post.frontmatter.title,
    name: post.frontmatter.abstract,
    content: post.content,
  }
}

async function BlogPost({ params: { postSlug }}) {
  const post = await loadBlogPost(postSlug);
  const components = {
    pre: (props) => (
      <CodeSnippet {...props}>
        {props.children}
      </CodeSnippet>
    ),
    DivisionGroupsDemo: (props) => (
      <DivisionGroupsDemo {...props} />
    ),
    CircularColorsDemo: (props) => (
      <CircularColorsDemo {...props} />
    ),
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={{...components}} />
      </div>
    </article>
  );
}

export default BlogPost;
