import Header from "../components/Header";
import Footer from "../components/Footer";
function DefaultLayout({ children }) {
  return (
    <div className="container mx-auto">
      {/* Header */}
      <Header />
      {/* Content */}
      <div>{children}</div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DefaultLayout;
