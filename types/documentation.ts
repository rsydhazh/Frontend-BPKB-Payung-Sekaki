export interface Documentation {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at?: string;
  modul?: string;
}

export interface DocumentationPayload {
  title: string;
  description: string;
  image_url: string;
}