import { FC, HtmlHTMLAttributes, ReactNode } from "react";

import { cn } from "~/lib/utils";

interface WrapperProperties extends HtmlHTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  children?: ReactNode;
}

export const Wrapper: FC<WrapperProperties> = ({
  width = `max-w-[1240px]`,
  height = `h-full`,
  children,
  className,
  ...rest
}) => {
  return (
    <section
      {...rest}
      className={cn(`mx-auto ${width} ${height} px-[1rem] xl:px-0`, className)}
    >
      {children}
    </section>
  );
};
