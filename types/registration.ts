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
  tanggal_lahir?: string;
  faskes?: string;
  status_peserta?: string;
  jenis_kb?: string;
  tanggal_pelayanan?: string;
}