import logo from "../assets/images/currency-rupee.svg";

export default function Header() {
  return (
    <nav className="h-[10svh] flex text-white items-center gap-20">
      <a href="/" className="flex gap-2 items-center">
        <img src={logo} alt="logo" width={30} height={30} className="" />
        <span className="font-bold  text-xl">Expense Tracker</span>
      </a>
    </nav>
  );
}
