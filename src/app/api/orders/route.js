import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: { persistSession: false },
    global: {
      fetch: (url, options) => {
        return fetch(url, { ...options, family: 4 });
      },
    },
  }
);

// POST — создание заказа
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      customerName,
      phone,
      email,
      city,
      address,
      comment,
      items,
      totalPrice,
    } = body;

    if (!customerName || !phone || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Заполните обязательные поля' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: customerName,
          phone: phone.replace(/[^\d]/g, ''),   
          email: email || null,
          city: city || null,
          address: address || null,
          comment: comment || null,
          items,
          total_price: totalPrice,
          status: 'new',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('SUPABASE ERROR:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ orderId: data.id, order: data }, { status: 201 });
  } catch (err) {
    console.error('SERVER ERROR:', err);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// GET — получение заказов по телефону
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json(
        { error: 'Укажите номер телефона' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('phone', phone.replace(/[^\d]/g, ''))
      .order('created_at', { ascending: false });

    if (error) {
      console.error('SUPABASE ERROR:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('SERVER ERROR:', err);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}