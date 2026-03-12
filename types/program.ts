export interface Program {
  id: number;
  name: string;
  description: string;
  cover_image: string;
  is_active?: boolean;
}

export interface ProgramPayload {
  name: string;
  description: string;
  cover_image: string;
}