import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ posts }) {
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
          {posts.map(({ _id, timestamp, title }) => (
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

export async function getStaticProps() {
  const res = await fetch('https://ghostly-zombie-21867.herokuapp.com/api/posts');
  const data = await res.json();
  const posts = data.posts;

  return {
    props: { posts }
  };
}