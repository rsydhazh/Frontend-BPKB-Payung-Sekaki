import Navbar from "@/components/public/Navbar";

export default function KeluargaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar type="keluarga" />
      <main className="min-h-screen bg-[#fcfdff]">
        {children}
      </main>
    </>
  );
}