import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import DateComponent from '../components/date';

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm <b>Kris</b>. I'm a Mechanical Engineer turned Software Developer. This page will be a front-end for my blog Rest API. You can view posts and submit comments to the back-end on each specific blog page.</p>
        <p>This page was bootstrapped from Next.js as I was going through their interactive course to get started with the framework. You can do the same <a href='https://nextjs.org/learn/basics/create-nextjs-app'>here.</a></p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ _id, timestamp, title }) => (
            <li className={utilStyles.listItem} key={_id}>
              <Link href={`/posts/${_id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={timestamp} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://ghostly-zombie-21867.herokuapp.com/api/posts');
  const data = await res.json();
  const posts = data.posts;

  return {
    props: { posts },
    revalidate: 1,
  };
}