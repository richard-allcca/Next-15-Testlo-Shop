import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  // TODO - Implementation not found
  // notFound();

  return (
    <div>
      <h1 >Category page ID: {id}</h1>
      <h1 className={titleFont.className} >Hello World</h1>
    </div>
  );
}
