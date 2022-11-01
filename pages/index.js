import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const data = await getSortedPostsData();
  const allPostsData = data.posts;
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm <b>Kris</b>. I'm a Mechanical Engineer turned Software Developer. This page will be a front-end for my blog Rest API.</p>
        <p>This page was bootstrapped from Next.js and I used its learning resources to create this front-end page.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ _id, timestamp, title }) => (
            <li className={utilStyles.listItem} key={_id}>
              <Link href={`/posts/${_id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={timestamp} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}