export interface News {
  id: string;     
  title: string;
  content: string;
  cover_image: string;
  modul: string;   
  created_at?: string;
  category?: string;
  slug?: string;   
}

export interface NewsPayload {
  title: string;
  content: string;
  cover_image: string;
  category?: string; // <-- Tambahkan baris ini juga
}