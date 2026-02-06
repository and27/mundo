import Image from "next/image";
import Link from "next/link";
import AvatarButton from "../common/AvatarButton";
import { useOnboardingStore } from "@/store/useOnboardingStore";

const TopNavigation = () => {
  const { name } = useOnboardingStore();
  return (
    <div className="bg-black/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="flex justify-between items-center px-5 md:px-10 py-2 md:py-3 max-w-screen-xl mx-auto">
        <Link href="/">
          <Image
            src="/images/logo-mundo.png"
            alt="Mundo Interior Logo"
            width={120}
            height={30}
            priority
          />
        </Link>
        <AvatarButton name={name} />
      </div>
    </div>
  );
};

export default TopNavigation;
