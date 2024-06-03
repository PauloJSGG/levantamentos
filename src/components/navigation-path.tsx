"use client";
import { usePathname } from "next/navigation";

export default function NavigationPath() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div>
      {pathname.split("/").map((path, index, arr) => {
        const href = arr.slice(0, index + 1).join("/");
        return (
          <span key={index} className="">
            <a
              href={href}
              className="cursor-pointer text-white hover:text-blue-500"
            >
              {path
                .replace(/%5B/g, "[")
                .replace(/%5D/g, "]")
                .replace(/%2F/g, "/")}
            </a>
            {index !== arr.length - 1 && " -> "}
          </span>
        );
      })}
    </div>
  );
}
