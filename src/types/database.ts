export type PromptSource = 'manual' | 'wechat' | 'twitter'

// 标签组/分类
export interface TagType {
  id: string
  name: string
  slug: string
  color: string
  sort_order: number
  created_at: string
}

export interface Tag {
  id: string
  name: string
  type: string // slug of tag_type for backward compatibility
  type_id: string | null
  color: string
  created_at: string
  tag_type?: TagType // joined data
}

export interface PromptImage {
  id: string
  prompt_id: string
  image_url: string
  thumbnail_url: string | null
  sort_order: number
  created_at: string
}

export interface Prompt {
  id: string
  title: string
  description: string | null
  prompt_text: string
  negative_prompt: string | null
  image_url: string
  thumbnail_url: string | null
  author_name: string | null
  source: PromptSource
  model: string | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
  view_count: number
  created_at: string
  updated_at: string
}

export interface PromptWithTags extends Prompt {
  tags: Tag[]
  images?: PromptImage[]
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
