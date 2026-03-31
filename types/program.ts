export interface Program {
  id: number;
  name: string;           // Menggunakan 'name' sesuai kode Ndoro
  description: string;    
  cover_image: string;    
  is_active?: boolean;  
  schedule?: string;      // Jadwal pelaksanaan
  module?: string;        // 'kependudukan' atau 'keluarga'
  category?: string;      // 'reguler', 'quick_win', 'kesejahteraan', atau 'kb'
}

export interface ProgramPayload {
  name: string;
  description: string;
  cover_image: string;
  is_active?: boolean;
  schedule?: string;
  module?: string;
  category?: string;
}