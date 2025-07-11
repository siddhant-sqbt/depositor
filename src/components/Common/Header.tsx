import CWCLogo from "./CwcLogo";

const Header = () => {
  return (
    <div className="sticky z-20 top-0 flex justify-between w-full bg-white border-b border-gray-200 p-2">
      <CWCLogo />
    </div>
  );
};

export default Header;
