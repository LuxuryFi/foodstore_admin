export interface Banner {
  id?: number;
  title?: string;
  description?: string;
  link_url?: string;
  image_url?: string;
  display_order?: number;
  area_id?: number;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
  start_date?: Date;
  end_date?: Date;
}


export interface BannerPayload {
  id?: number;
  title?: string;
  description?: string;
  link_url?: string;
  display_order?: number;
  area_id?: number;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
  start_date?: Date;
  end_date?: Date;
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
