export interface Internal {
  id?: number
  internal_name?: string
  amount?: number
  price?: string
  expired_date?: Date
  description?: string
  stock_quantity?: string
  url?: string
}

export interface InternalPayload {
  id: number
  internal_name: string
  amount: number
  price: string
  expired_date: Date
  description: string
  stock_quantity: string
  url: Image[]
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
