import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: { persistSession: false },
    global: {
      fetch: (url, options) => {
        // Принудительно используем IPv4
        return fetch(url, { ...options, family: 4 });
      },
    },
  }
);

export async function GET() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('SUPABASE ERROR:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const products = data.map((item) => ({
    id: item.id,
    link: item.link,
    imgSrc: item.img_src,
    price: item.price,
    brand: item.brand,
    description: item.description,
    category: item.category,
    sizes: item.sizes,
    type: item.type,
    color: item.color,
    fullDescription: item.full_description,
    features: item.features,
  }));

  return NextResponse.json(products);
}