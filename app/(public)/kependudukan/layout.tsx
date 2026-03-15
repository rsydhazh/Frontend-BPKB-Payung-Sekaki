import Navbar from "@/components/public/Navbar";

export default function BinaGenerasiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar type="kependudukan" />
      <main className="min-h-screen bg-[#fcfdff]">
        {children}
      </main>
    </>
  );
}