import Image from "next/image";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={className}>
      <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" />
      <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
        Horizon
      </h1>
    </Link>
  );
};

export default Logo;
