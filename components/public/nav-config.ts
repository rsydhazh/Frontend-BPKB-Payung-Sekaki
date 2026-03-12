// components/public/nav-config.ts

export type NavItem = {
  label: string;
  href: string;
};

// Mengelompokkan menu berdasarkan modul
export const navMenus: Record<"umum" | "bina-generasi" | "keluarga", NavItem[]> = {
  umum: [
    { label: "Beranda", href: "/umum" },
    { label: "Tentang", href: "/umum/tentang" },
    { label: "Program", href: "/umum/program" },
    { label: "Galeri", href: "/umum/galeri" },
    { label: "Berita", href: "/umum/berita" },
  ],
  "bina-generasi": [
    { label: "Beranda", href: "/bina-generasi" },
    { label: "Tentang", href: "/bina-generasi/tentang" },
    { label: "Galeri", href: "/bina-generasi/galeri" },
    { label: "Berita", href: "/bina-generasi/berita" },
  ],
  keluarga: [
    { label: "Beranda", href: "/keluarga" },
    { label: "Tentang", href: "/keluarga/tentang" },
    { label: "Galeri", href: "/keluarga/galeri" },
    { label: "Berita", href: "/keluarga/berita" },
  ],
};