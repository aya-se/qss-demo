import Header from "./Header";
import Footer from "./Footer";
import { ReactElement } from "react";
import Head from "next/head";

type LayoutProps = {
  children: ReactElement;
};
export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Demonstration of Query Suggestion and Summarization"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <div {...props}>{children}</div>
      <Footer />
    </>
  );
}
