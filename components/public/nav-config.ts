export type NavItem = {
  label: string;
  href: string;
};

// Mengelompokkan menu berdasarkan modul
export const navMenus: Record<"umum" | "kependudukan" | "keluarga", NavItem[]> = {
  umum: [
    { label: "Beranda", href: "/umum" },
    { label: "Tentang", href: "/umum/tentang" },
    { label: "Galeri", href: "/umum/galeri" },
    { label: "Berita", href: "/umum/berita" },
  ],
  "kependudukan": [
    { label: "Beranda", href: "/kependudukan" },
    { label: "Tentang", href: "/kependudukan/tentang" },
    { label: "Galeri", href: "/kependudukan/galeri" },
    { label: "Berita", href: "/kependudukan/berita" },
    { label: "Pendaftaran", href: "/kependudukan/pendaftaran" }
  ],
  keluarga: [
    { label: "Beranda", href: "/keluarga" },
    { label: "Tentang", href: "/keluarga/tentang" },
    { label: "Galeri", href: "/keluarga/galeri" },
    { label: "Berita", href: "/keluarga/berita" },
    { label: "Pendaftaran Yan KB", href: "/keluarga/pendaftaran" }
  ],
};