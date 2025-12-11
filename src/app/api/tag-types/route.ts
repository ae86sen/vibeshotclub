import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - 获取所有标签组 (公开只读)
export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('tag_types')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ tagTypes: data })
  } catch (error) {
    console.error('Get tag types error:', error)
    return NextResponse.json({ error: '获取标签组失败' }, { status: 500 })
  }
}
