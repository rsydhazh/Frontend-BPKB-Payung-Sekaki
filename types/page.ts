export interface Page {
  id: number;
  title: string;
  content: string;
  slug: string;
}

export interface PagePayload {
  title: string;
  content: string;
}