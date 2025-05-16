import Link from "next/link";
import { FiLogOut, FiUser } from "react-icons/fi";

export function Header() {
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-md">
      <nav className="w-full max-w-7xl flex items-center justify-between mx-auto">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>
        <div className="flex items-baseline gap-4">
          <Link href={"#"} className="hover:scale-95 duration-300">
            <FiUser size={24} color="#4b5563" />
          </Link>
          <button className="cursor-pointer hover:scale-95 duration-300">
            <FiLogOut size={24} color="#4b5563" />
          </button>
        </div>
      </nav>
    </header>
  );
}
