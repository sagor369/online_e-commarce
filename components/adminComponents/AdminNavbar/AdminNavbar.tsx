import { AlignJustify, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { DefaultUser } from "@/app/admin/images";

const AdminNavbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
  [x: string]: any;
}) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = useState(
    document.body.classList.contains("dark")
  );
  const { data: session }: any = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            href="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-[#F4F7FE] text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <Search className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-[#F4F7FE] text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <AlignJustify className="h-5 w-5" />
        </span>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <Image
              height="20"
              className="h-10 w-10 rounded-full border cursor-pointer"
              src={session?.user?.photoURL || DefaultUser}
              alt="profile"
            />
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        >
          <div className="flex pb-2 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="ml-4 mt-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  👋  Hey, {session?.user?.name}
                </p>{" "}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
            <div className="ml-4 my-3 flex flex-col">
              <p
                onClick={handleSignOut}
                className="text-sm font-medium text-red-500 hover:text-red-500 cursor-pointer"
              >
                Log Out
              </p>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default AdminNavbar;
