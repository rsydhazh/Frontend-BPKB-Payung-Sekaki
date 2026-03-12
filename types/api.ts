export interface News {
  id: number
  title: string
  content: string
  cover_image: string
}

export interface Documentation {
  id: number
  title: string
  description: string
  image_url: string
}

export interface Program {
  id: number
  name: string
  description: string
  cover_image: string
}

export interface Settings {
  nama_balai: string
  alamat: string
  visi: string
  misi: string
  deskripsi: string
  struktur_organisasi: string
}