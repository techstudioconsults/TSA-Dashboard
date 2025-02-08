import { TsaButton } from "@strategic-dot/components";

const Hero = () => {
  return (
    <div className="flex items-center justify-between pt-5">
      <h3 className="text-left">Welcome, Admin</h3>
      <div className="flex gap-4">
        <TsaButton variant="outline" className="outline-blue-600">
          Create Sheet
        </TsaButton>

        <TsaButton
          href="/createcourse"
          variant="outline"
          className="bg-mid-blue text-white"
        >
          Create Course
        </TsaButton>
      </div>
    </div>
  );
};

export default Hero;
