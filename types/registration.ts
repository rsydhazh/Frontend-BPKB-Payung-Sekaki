export interface Registration {
  id: number;
  program_id: string;
  full_name: string;
  nik: string;
  address: string;
  phone_number: string;
  created_at?: string; 
}

export interface RegistrationPayload {
  program_id: string;
  full_name: string;
  nik: string;
  address: string;
  phone_number: string;
}