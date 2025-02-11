"use client ";

import Image from "next/image";
import { useEffect } from "react";

import { useAuthStore } from "~/stores/authStore";
import { useClassStore } from "~/stores/classStore";
import { useCourseStore } from "~/stores/courseStore";
import { useSheetStore } from "~/stores/sheetStore";

const Cards = () => {
  const totalCohorts = useClassStore((state) => state.totalCohorts);
  const totalCourse = useCourseStore((state) => state.totalCourse);
  const totalSheet = useSheetStore((state) => state.totalSheet);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      useClassStore.getState().fetchTotalCohorts(token);
      useCourseStore.getState().fetchTotalCourse(token);
      useSheetStore.getState().fetchTotalSheets(token);
    }
  }, []);

  return (
    <div>
      <section className="grid grid-cols-3 justify-between gap-5 py-8">
        <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Course</h6>
            <h3>{totalCourse}</h3>
            <p className="pt-3"> Null% since last month </p>
          </div>

          <Image
            width={100}
            height={100}
            className="object-cover"
            src="images/total-courese.svg"
            alt="course"
            priority
          />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Class</h6>
            <h3>{totalCohorts}</h3>
            <p className="pt-3"> Null% since last month </p>
          </div>
          <Image
            width={100}
            height={100}
            className="object-cover"
            src="images/total-class.svg"
            alt="class"
            priority
          />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Sheet</h6>
            <h3>{totalSheet}</h3>
            <p className="pt-3"> Null% since last month </p>
          </div>
          <Image
            width={100}
            height={100}
            className="object-cover"
            src="images/total-sheet.svg"
            alt="sheet"
            priority
          />
        </div>
      </section>
    </div>
  );
};

export default Cards;
