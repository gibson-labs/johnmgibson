import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="pt-24">
        <Navbar />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
