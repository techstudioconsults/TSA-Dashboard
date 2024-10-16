"use client";

import { TsaCarousel } from "@strategic-dot/components";
import Image from "next/image";

import { Wrapper } from "~/components/layout/wrapper";

export const GALLARY_CONTENT = [
  <Image
    className="w-full object-bottom"
    key={0}
    width={500}
    height={50}
    src={"/images/img-1.png"}
    alt={"img"}
  />,
  <Image
    className="w-full object-bottom"
    key={1}
    width={500}
    height={50}
    src={"/images/img-2.png"}
    alt={"img"}
  />,
];

export const Gallery = () => {
  return (
    <Wrapper className="relative items-center gap-[28px] gap-y-0 lg:flex lg:py-[100px]">
      <TsaCarousel variant="gallery" galleryContent={GALLARY_CONTENT} />

      <div className="right-0 z-10 rounded-lg bg-background px-[28px] py-[47px] shadow-lg lg:absolute lg:max-w-[458px]">
        <div>
          <h6 className="font-bold">A World-Class Learning Facility</h6>
          <p className="my-[25px] leading-[26px]">
            At Tech Studio Academy, we have created a conducive environment for
            learning, combining exceptional school structures, inspiring
            classrooms, and dedicated tutors. We understand that the physical
            surroundings greatly impact the educational experience, and we
            strive to provide a nurturing setting that fosters academic growth,
            creativity, and personal development.
          </p>
          <p className="leading-[26px]">
            Our classrooms are carefully designed to facilitate effective
            teaching and learning to enable tutors to deliver dynamic and
            engaging lessons that captivate students attention and spark their
            curiosity.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};
