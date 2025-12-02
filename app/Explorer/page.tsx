import Explorer from "./_components/Explorer";
import { getExplorerVideos } from "@/server-actions";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ searchParams }: Props) {
  const id = searchParams?.id;

  if (id) {
    const data = await getExplorerVideos(id);
    const video = data?.[0];
    return {
      title: video?.offer_title || "استكشف العروض - Bookik",
      description: video?.detail || "شاهد أفضل الفيديوهات الترويجية.",
      openGraph: {
        title: video?.offer_title,
        description: video?.detail,
        images: [video?.image || "/default-og.jpg"],
      },
    };
  }

  return {
    title: "استكشف العروض - Bookik",
    description: "شاهد أفضل الفيديوهات الترويجية واكتشف المزيد من العروض.",
  };
}
export default function ExplorerPage({ searchParams }: Props) {
  const id = searchParams.id;

  return <Explorer searchParams={searchParams} />;
}
