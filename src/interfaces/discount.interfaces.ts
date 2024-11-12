export interface Discount {
  id?: number
  discount_name?: string
  discount_code?: string
  discount_percentage?: number
  start_date?: Date
  end_date?: Date
  product_id?: number
  price?: string
  category_id?: number
  status?: boolean
  description?: string
}

export interface DiscountPayload {
  id?: number
  discount_name?: string
  discount_code?: string
  discount_percentage?: number
  start_date?: Date
  end_date?: Date
  product_id?: number
  price?: string
  category_id?: number
  status?: boolean
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
