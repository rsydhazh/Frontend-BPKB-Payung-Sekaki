import Footer from "@/components/public/Footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-0 p-0">
      <main className="w-full">
        {children}
      </main>

      <Footer/>
    </div>
  );
}