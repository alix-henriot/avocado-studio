// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { category } from '@/db/schema';

export async function GET() {
  try {
    const categories = await db
      .select({
        id: category.id,
        value: category.value
      })
      .from(category);

    return NextResponse.json(categories);
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}