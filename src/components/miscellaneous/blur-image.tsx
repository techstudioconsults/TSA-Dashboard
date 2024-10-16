"use client";

import Image from "next/image";
import { FC, useState, type ComponentProps } from "react";

import { cn } from "~/lib/utils";

interface BlurImageProperties extends ComponentProps<typeof Image> {
  _width?: number;
  _height?: number;
}

export const BlurImage: FC<BlurImageProperties> = ({
  _width = 300, // Default width
  _height = 200, // Default height
  className,
  alt,
  ...properties
}) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        paddingBottom: `${(_height / _width) * 100}%`, // Maintain aspect ratio
        maxWidth: "100%",
      }}
    >
      <Image
        {...properties}
        width={_width}
        height={_height}
        alt={alt || "image"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover duration-700 ease-in-out",
          isLoading ? "blur-lg" : "blur-0",
        )}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
