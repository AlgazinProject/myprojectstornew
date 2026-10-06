import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Создаём клиент Supabase с ключами из .env.local
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
    // Запрашиваем все товары из таблицы products
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Преобразуем snake_case (img_src, full_description) в camelCase (imgSrc, fullDescription)
    // чтобы фронтенд не переделывать
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

    if (error) {
        console.error('SUPABASE ERROR:', error);   // ← добавь эту строку
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(products);
}