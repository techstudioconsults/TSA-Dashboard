import { TsaButton } from "@strategic-dot/components";

const Hero = () => {
  return (
    <div className="flex items-center justify-between pt-5">
      <h3 className="text-left">Welcome, Admin</h3>
      <div className="flex gap-4">
        <TsaButton variant="primary" className="bg-mid-blue">
          {" "}
          Create Sheet
        </TsaButton>
        <TsaButton variant="outline"> Create Course</TsaButton>
      </div>
    </div>
  );
};

export default Hero;
