import { useMemo } from 'react';
import useSWR from 'swr';
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

const fetchJson = (...args) => fetch(...args).then(res => res.json());

export default function Product() {
  const router = useRouter()
  const slug = router.query.slug || '';

  const { data, error } = useSWR(`https://apollo.gener8ads.com/marketplace/products?slug=${slug}`, fetchJson);

  const product = useMemo(() => {
    if (!data) {
      return;
    }

    return data.data[0];
  }, [data]);

  console.log(product);

  return (
    <Layout>
      {product && (
        <div>
          {product.attributes.title}
        </div>
      )}
    </Layout>
  )
}
