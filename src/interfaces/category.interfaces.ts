export interface Category {
  id?: number
  category_name?: string
  status?: boolean
  description?: string
}

export interface CategoryPayload {
  id?: number
  category_name?: string
  status: boolean
  description?: string
}

export interface Image {
  response: Response
}

export interface Response {
  file: File
}

export interface File {
  filename: string
}
