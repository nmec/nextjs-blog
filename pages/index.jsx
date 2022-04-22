import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import useSWR from 'swr';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  const res = await fetch('https://ifconfig.io/ip');
  const ip = await res.text();

  return {
    props: {
      allPostsData,
      ip,
    }
  }
}

const fetchJson = (...args) => fetch(...args).then(res => res.json());

export default function Home({ allPostsData, ip }) {
  const { data, error } = useSWR('https://httpbin.org/get', fetchJson);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Maker of things.</p>
        <p>Built on <code>{ip}</code></p>

        <div className="data">
          {!data && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {data && !error && (
            <pre>{data.headers['User-Agent']}</pre>
          )}
        </div>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}