import { loadReader } from "@/lib/rss/reader";
import Reader from "./Reader";

export const metadata = {
  title: "Defence Feeds — Jay Greasley",
  description: "A minimal OPML-driven RSS reader for UK defence and security news.",
};

// Feeds are fetched on the server and the page is regenerated at most every 30 minutes.
export const revalidate = 1800;

export default async function RssReaderPage() {
  const data = await loadReader({ days: 7 });
  return <Reader data={data} />;
}
