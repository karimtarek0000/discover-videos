import Image from "next/image";
import Link from "next/link";

const Logo = ({ classNames }: { classNames?: string }): JSX.Element => {
  return (
    <Link href="/home" className={classNames}>
      <Image src="/images/netflix.svg" alt="logo" width={0} height={0} className="w-[6.25rem] md:w-[9.375rem]" />
    </Link>
  );
};

export default Logo;
