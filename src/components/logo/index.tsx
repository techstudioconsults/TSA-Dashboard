import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" data-testid="logo">
      <Image
        src="/images/logo-black.png"
        alt="Techstudio academy logo"
        height={37}
        width={150}
      />
    </Link>
  );
};

export default Logo;
