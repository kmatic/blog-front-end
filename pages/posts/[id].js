import Layout from '../../components/layout'
import Head from 'next/head';
import DateComponent from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { useState } from 'react';

export default function Post({ post, comments }) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [commentState, setCommentState] = useState(comments);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setCommentState([...commentState, { name, text, timestamp: new Date(Date.now()).toISOString() }]);
      try {
        const res = await fetch(`https://ghostly-zombie-21867.herokuapp.com/api/posts/${post._id}/comments`, {
          method: "POST",
          body: JSON.stringify({
            name: name,
            text: text
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          setName('');
          setText('');
        } else {
          console.log('Some error occurred');
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Layout>
        <Head>
          <title>{post.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{post.title}</h1>
          <div className={utilStyles.lightText}>
            <DateComponent dateString={post.timestamp} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.text }} />
        </article>
        <ul className={utilStyles.list}>
          <h2 className={utilStyles.headingLg}>Comments</h2>
          {commentState.length > 0 ? (commentState.map((comment) => (
            <li key={comment._id}>
              <h3 style={{marginBottom:0}}>{comment.text}</h3>
              <small>Posted by: {comment.name}</small>
              <br />
              <small className={utilStyles.lightText}>
                <DateComponent dateString={comment.timestamp} />
              </small>
            </li>
          ))) : (
            <li>
                <p>There are no comments yet! Be the first!</p>
            </li>
          )}
        </ul>
        <form onSubmit={handleSubmit} className={utilStyles.form}>
          <h2 style={{marginBottom:0}}>Post a Comment</h2>
          <div className={utilStyles.formDiv}>
              <label htmlFor='name'>Name: </label>
              <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} className={utilStyles.input}></input>
          </div>
          <div className={utilStyles.formDiv}>
              <label htmlFor='text'>Message: </label>
              <input type='text' name='text' value={text} onChange={(e) => setText(e.target.value)} className={utilStyles.input}></input>
          </div>
          <button className={utilStyles.button}>Post</button>
        </form>
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
      props: { post, comments },
      revalidate: 1,
    };
}