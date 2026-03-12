export interface Orang {
  id: number;
  name: string;
  role: string;
  is_active: boolean;
}

export interface OrangPayload {
  name: string;
  role: string;
  is_active: boolean;
}