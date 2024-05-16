import MarginWidthWrapper from "../MarginWidthWrapper";
import PageWrapper from "../PageWrapper";

import Header from "./Header";
import SideNav from "./SideNav";

export default function MyLayout({
  children, pageTitle
}: {
  children: React.ReactNode;
  pageTitle: String;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <div className="flex">
          <SideNav/>
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header>{pageTitle}</Header>
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}