import { montserratAlternates } from "@/config/fonts";

export default function EmptyPage() {
  return (
    <div>
      <h1 >Empty page</h1>
      <h1 className={montserratAlternates.className} >Hello World</h1>
    </div>
  );
}
