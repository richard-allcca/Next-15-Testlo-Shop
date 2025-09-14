import { titleFont } from "@/config/fonts";

interface TitleProps {
  title: string;
  subTitle?: string;
  className?: string;
}

export const Title = ({ title, subTitle, className }: TitleProps) => {
  return (
    <h1 className={`mt-3 ${className}`}>
      <span className={` ${titleFont.className} antialiased text-4xl font-semibold my-10 `} >
        {title}
      </span>
      {
        subTitle && <span className="text-xl mb-5">{subTitle}</span>
      }
    </h1>
  );
}