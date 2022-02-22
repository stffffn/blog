import { GetStaticPaths } from 'next';
import React from 'react';
import { getAllPostSlugs, getPostData } from '../lib/posts';
import { IPostData } from '../types/PostData';
import { ISlug } from '../types/Slug';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PostData from '../components/PostData';
import styles from '../styles/markdown.module.scss';
import Head from 'next/head';
import { prefix } from '../lib/prefix';

const PostContent = ({
  postData: { title, date, tags, content, slug },
}: {
  postData: IPostData;
}) => {
  return (
    <>
      <Head>
        <title>{title} / Blog / Steffen Weitz</title>
      </Head>

      <article>
        <div className="mb-4">
          <PostData
            post={{ title, date, tags, slug }}
            headlineClickable={false}
          />
        </div>
        <ReactMarkdown
          className={styles.markdown}
          remarkPlugins={[remarkGfm]}
          linkTarget={'_blank'}
          components={{
            img({ src, alt }) {
              return (
                <a href={src} target="_blank" rel="noreferrer">
                  <img src={prefix + src} alt={alt} />
                </a>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }: ISlug) => {
  const postData = getPostData(slug);

  return {
    props: { postData },
  };
};

export default PostContent;