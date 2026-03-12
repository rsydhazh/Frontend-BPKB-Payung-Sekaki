export interface News {
  id: number;
  title: string;
  content: string;
  cover_image: string;
  created_at?: string;
  category?: string; // <-- Tambahkan baris ini
}

export interface NewsPayload {
  title: string;
  content: string;
  cover_image: string;
  category?: string; // <-- Tambahkan baris ini juga
}