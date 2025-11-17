import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { fetchGeneral } from "@/lib/api";
import { TGeneral } from "@/types/general";
import { AppProvider } from "@/components/ui/app-provider";
import { CookieConsentComponent } from "@/components/cookie-consent/cookie-consent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

const font = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZSS Rosa",
  description:
    "Zariadenie sociálnych služieb ROSA poskytuje odbornú a ľudskú starostlivosť osobám so zdravotným znevýhodnením. Pomáhame k samostatnosti, dôstojnosti a lepšiemu životu prostredníctvom rehabilitačných, pobytových a ambulantných služieb v pokojnom prostredí Bratislavy.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const general = (await fetchGeneral()) as TGeneral;

  return (
    <html lang="sk">
      <body className={`${font.variable} ${font.className} antialiased`}>
        <AppProvider>
          <Header general={general} />
          <CookieConsentComponent />
          <main>{children}</main>
          <Footer general={general} />
        </AppProvider>
      </body>
    </html>
  );
}
