import Link from "next/link";

const Navbar = (): React.JSX.Element => {
  return (
    <nav className="mx-auto max-w-6xl px-4 py-3">
      <Link href="/" className="font-black font-heading text-xl">
        Soulplay.
      </Link>
    </nav>
  );
};
export default Navbar;
