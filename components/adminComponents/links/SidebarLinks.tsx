import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

const SidebarLink = ({ route }: any) => {
  const pathname = usePathname();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname]
  );

  return (
    <li className="mb-5">
      <Link
        href={route.layout + "/" + route.path}
        className="my-[3px] flex cursor-pointer items-center px-8"
      >
        <span
          className={`${
            activeRoute(route.path) === true
              ? "font-bold text-primary dark:text-white"
              : "font-medium text-gray-600"
          }`}
        >
          {route.icon}
        </span>
        <p
          className={`leading-1 ml-4 flex ${
            activeRoute(route.path) === true
              ? "font-bold text-primary dark:text-white"
              : "font-medium text-gray-600"
          }`}
        >
          {route.name}
        </p>
      </Link>
    </li>
  );
};

export default SidebarLink;
