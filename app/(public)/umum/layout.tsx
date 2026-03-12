import Navbar from "@/components/public/Navbar";

export default function UmumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar type="umum" />
      <main className="min-h-screen bg-[#fcfdff]">
        {children}
      </main>
    </>
  );
}