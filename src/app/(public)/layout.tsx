import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingMobileBar from "@/components/layout/FloatingMobileBar";

// Public website chrome. Admin routes use src/app/admin/layout.tsx instead,
// so the public navbar and footer never render inside the staff portal.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <FloatingMobileBar />
    </>
  );
}
