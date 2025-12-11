import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface TagTypeData {
  id: string
  name: string
  slug: string
  color: string
  sort_order: number
}

interface TagData {
  id: string
  name: string
  type: string
  type_id: string | null
  color: string
  created_at: string
  tag_type: TagTypeData | TagTypeData[] | null
}

// GET - 获取所有标签 (公开只读)
export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('tags')
      .select(`
        id,
        name,
        type,
        type_id,
        color,
        created_at,
        tag_type:tag_types (
          id,
          name,
          slug,
          color,
          sort_order
        )
      `)
      .order('type')
      .order('name')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform data - use tag_type info if available
    // Supabase returns single FK relation as object, but TypeScript may infer array
    const tags = (data as TagData[] | null)?.map(tag => {
      const tagType = Array.isArray(tag.tag_type) ? tag.tag_type[0] : tag.tag_type
      return {
        ...tag,
        type: tagType?.slug || tag.type,
        tag_type: tagType || undefined,
      }
    })

    return NextResponse.json({ tags })
  } catch (error) {
    console.error('Get tags error:', error)
    return NextResponse.json({ error: '获取标签失败' }, { status: 500 })
  }
}
