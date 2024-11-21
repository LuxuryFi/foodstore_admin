export interface Order {
  id?: number
  order_name?: string
  order_code?: string
  order_percentage?: number
  start_date?: Date
  end_date?: Date
  product_id?: number
  price?: string
  category_id?: number
  status?: boolean
  description?: string
}

export interface OrderPayload {
  id?: number
  order_name?: string
  order_code?: string
  order_percentage?: number
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
