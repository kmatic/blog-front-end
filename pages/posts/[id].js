import Layout from '../../components/layout'
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ post, comments }) {
    console.log(comments);
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
        <ul className={utilStyles.list}>
          <h2 className={utilStyles.headingLg}>Comments</h2>
          {comments.map((comment) => (
            <li key={comment._id}>
              <h3 style={{marginBottom:0}}>TEST TEST TEST</h3>
              <small className={utilStyles.lightText}>
                <Date dateString={comment.timestamp} />
              </small>
            </li>
          ))}
        </ul>
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
    // get posts
    const postRes = await fetch(`https://ghostly-zombie-21867.herokuapp.com/api/posts/${params.id}`);
    const postData = await postRes.json();
    const post = postData.post;

    // get comments
    const commentRes = await fetch(`https://ghostly-zombie-21867.herokuapp.com/api/posts/${params.id}/comments`);
    const commentData = await commentRes.json();
    const comments = commentData.comments;

    return {
      props: { post, comments }
    };
}