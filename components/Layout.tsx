import Header from "./Header";
import Footer from "./Footer";
import { ReactElement } from "react";

type LayoutProps = {
  children: ReactElement;
};
export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="m-4 fade-in" {...props}>
        {children}
      </div>
      <Footer />
    </>
  );
}
