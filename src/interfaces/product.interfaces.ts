export interface Product {
  id?: number
  image?: string
  product_name?: string
  amount?: number
  price?: string
  expired_date?: Date
  description?: string
  stock_quantity?: string
}

export interface ProductPayload {
  id?: number
  product_name?: string
  amount?: number
  price?: string
  expired_date?: Date
  description?: string
  stock_quantity?: string
  image?: Image[]
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
