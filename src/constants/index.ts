import { courseContentProperties, NavLink } from "~/types/index.types";

export const SLIDE_CONTENT: courseContentProperties[] = [
  {
    name: "Fullstack Development",
    image: "/images/fullstack.png",
    link: "/courses/fullstack-development",
  },
  {
    name: "Product Design",
    image: "/images/ui-ux.png",
    link: "/courses/product-design-ui-ux",
  },
  {
    name: "Data Science",
    image: "/images/datascience.png",
    link: "/courses/data-science",
  },
  {
    name: "Digital Marketing",
    image: "/images/logo-black.png",
    link: "/courses/digital-marketing-immersive",
  },
  {
    name: "Cyber Security",
    image: "/images/logo-black.png",
    link: "/courses/cyber-security",
  },
];

// Use the types to define the NAV_LINKS array
export const STATIC_NAV_LINK: NavLink[] = [
  { route: "About Us", link: "/about" },
  {
    route: "Courses",
    link: "",
    dropdown: [],
  },
  { route: "FAQ", link: "/faq" },
  { route: "Contact Us", link: "/contact" },
];

export const COMPANIES = [
  "/companies/btc.png",
  "/companies/access-bank.png",
  "/companies/interswitch.png",
  "/companies/loyalty-solution.png",
  "/companies/pwc.png",
  "/companies/stutern.png",
  "/companies/uba.png",
];

export const TESTIMONIALS = [
  {
    message: `I came into techStudio Academy with practically no prior knowledge in software development. However, within a few weeks, I was able to grasp the crux of software development and also master the soft skills required for being a software developer. So far so good, the skills acquired have given me a mind-blowing push in my career as a software developer.`,
    image: `/images/joseph.jpg`,
    name: `JOSEPH DARAMOLA`,
    job: `Frontend Developer`,
  },
  {
    message: `TechStudio Academy has been one of the big push I needed to get in the real world space. I had an immense learning that was really different from the self learning I started with. The learning was fun and there were some internship job opportunities that were presented to us. I got my first gig immediately after the program. Thank you TechStudio for that push I needed.`,
    image: `/images/peter.jpg`,
    name: `PETER EDEAWE`,
    job: `Software Developer`,
  },
  {
    message: `I bless the day the Instagram algorithm pop up TechStudio Academy to my news feed. I read through their curriculum and other details about the Bootcamp and I told myself this is the opportunity I've been waiting for. I wasn't disappointed, the environment was well ventilated and conducive, with competent instructors. Here I am today at OT&T Consulting, fulfilling my dreams thanks to TechStudio Academy.`,
    image: `/images/rilwan.jpg`,
    name: `RILWAN AJIBOLA`,
    job: `Software Developer`,
  },
];

export const STEPS = [
  {
    label: "Apply",
    description:
      "At Tech Studio we offer a variety of courses designed to build your skills and professionally improve you. All you have to do is apply.",
  },
  {
    label: "Get Admitted",
    description:
      "Once we confirm your payment for the program, we reserve your spot. You will go through the onboarding process before the program starts.",
  },
  {
    label: "Start classes",
    description:
      "Be sure to attend the introductory classes, this will play a huge role in your subsequent learning stages. You'll participate in projects, personal tasks, and group works.",
  },
];

export const CourseSteps = [];

export const FACILITY_CONTENT = [
  "/images/facility1.png",
  "/images/facility2.png",
  "/images/facility3.png",
  "/images/facility4.png",
  "/images/facility5.png",
  "/images/facility6.png",
  "/images/facility7.png",
];
