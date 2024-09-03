import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PARTOS-PAT",
  description: "Make power dynamics more visible",
};

export default async function LocaleLayout({ children, params: { locale } }) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  borderRadius: 0,
                  fontFamily: "inherit",
                  colorPrimary: "#FFD249",
                  colorLink: "#FFD249",
                },
                components: {
                  Form: {
                    itemMarginBottom: 16,
                  },
                },
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
