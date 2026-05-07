import Link from "next/link";

export const Footer = () => {
  const today = new Date();
  return (
    <footer className="pt-36 pb-16 flex justify-between">
      <div>&copy; {today.getFullYear()} Mesoamerican Migration Project.</div>
      <Link href="https://digital-accessibility.brown.edu/">Accessibility</Link>
    </footer>
  );
};
