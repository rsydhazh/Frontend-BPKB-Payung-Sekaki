export interface Posyandu {
  id: number;
  nama: string;
  lokasi: string;
  jadwal: string;
  kader: string;
}

export interface Settings {
  id?: number;
  nama_balai?: string;
  alamat?: string;
  sejarah?: string;
  visi?: string;
  misi?: string;
  struktur_organisasi?: string;
  daftar_posyandu?: Posyandu[]; 
}