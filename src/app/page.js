import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from "@/helpers/file-helpers"

import { BLOG_TITLE } from "@/constants"

export const metadata = {
  title: BLOG_TITLE,
  name: "description",
  content: "A wonderful blog about JavaScript"
}

async function Home() {
  const list = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      {/* TODO: Iterate over the data read from the file system! */}
      {list.map((post) => (
        <BlogSummaryCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          abstract={post.abstract}
          publishedOn={post.publishedOn}
        />
      ))}
    </div>
  );
}

export default Home;
