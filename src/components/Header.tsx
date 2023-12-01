import Link from "next/link";

export const Header = () => {
  return (
    <header className="justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <h1 className="sm:text-4xl text-2xl font-bold  tracking-tight text-center">
        <Link href="/" className="mx-auto">
          ProfileLytical<span style={{ color: "#f54180" }}>.xyz</span>
        </Link>
      </h1>
    </header>
  );
};
