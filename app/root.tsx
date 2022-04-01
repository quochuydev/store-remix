import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  MetaFunction,
} from "remix";
import type { LinksFunction } from "remix";
import styles from "./styles/app.css";
import toastify from "react-toastify/dist/ReactToastify.css";
import tiny from "tiny-slider/dist/tiny-slider.css";

import { description as seoDescription, getSeo, getSeoMeta } from "./utils/seo";

let [seoMeta, seoLinks] = getSeo();

export let links: LinksFunction = () => {
  return [
    ...seoLinks,
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: toastify },
    // { rel: "stylesheet", href: tiny },
  ];
};

export type RootLoaderData = {
  country: string;
  i18n: string;
  locale: string;
  requestInfo: {
    origin: string;
    path: string;
    session: {
      theme: null;
    };
  };
};

export let meta: MetaFunction = ({ data }: { data: RootLoaderData }) => {
  const locale = data?.locale ?? "en";

  return {
    viewport: "width=device-width, initial-scale=1",
    ...seoMeta,
    ...getSeoMeta({
      // @ts-ignore
      description: seoDescription[locale as any].join(" "),
      openGraph: {
        images: [
          {
            alt: "Huy Pham - @quochuydev",
            url: "/",
            height: 630,
            width: 1200,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        image: {
          alt: "Huy Pham - @quochuydev",
          url: "@quochuydev",
        },
      },
    }),
  };
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error?.message}</p>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-201244774-1"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-201244774-1', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
