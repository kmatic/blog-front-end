import Layout from '../../components/layout'
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ post }) {
    return (
      <Layout>
        <Head>
          <title>{post.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{post.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={post.timestamp} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.text }} />
        </article>
      </Layout>
    );
}

export async function getStaticPaths() {
    const res = await fetch('https://ghostly-zombie-21867.herokuapp.com/api/posts');
    const data = await res.json();
    const posts = data.posts;

    const paths = posts.map(post => {
        return {
            params: { id: post._id}
        }
    });

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://ghostly-zombie-21867.herokuapp.com/api/posts/${params.id}`);
    const data = await res.json();
    const post = data.post;

    return {
      props: { post }
    };
}