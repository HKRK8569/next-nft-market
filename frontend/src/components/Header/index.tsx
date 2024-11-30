"use client";

import Link from "next/link";
import { WalletConnectButton } from "../WalletConnectButton";
import PAGES from "@/constants/pages";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

const links = [
  {
    id: 1,
    title: "TOP",
    href: PAGES.TOP,
  },
  {
    id: 2,
    title: "NFT作成",
    href: PAGES.CREATE,
  },
  {
    id: 3,
    title: "マイページ",
    href: PAGES.MYPAGE,
  },
];

const Navbar = () => {
  const route = usePathname();
  const activeRoute = route.split("/")[1];
  return (
    <div className="flex justify-center">
      {links.map((link, index) => {
        return (
          <Link
            key={link.id}
            href={link.href}
            className={twMerge(
              link.href === `/${activeRoute}` ? "text-gray-300" : "txt-black",
              links.length !== index + 1 ? "mr-4" : "",
            )}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};
const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-300 bg-white px-4 py-2">
      <div className="flex items-center">
        <Link href={PAGES.TOP} className="mr-8">
          MarketPlace
        </Link>
        <Navbar />
      </div>

      <div className="text-right">
        <WalletConnectButton />
      </div>
    </header>
  );
};

export default Header;
