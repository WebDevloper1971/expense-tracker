import lkdn from "../assets/images/linkedin.svg";
import youtube from "../assets/images/youtube.svg";
import github from "../assets/images/github.svg";

export default function Footer() {
  return (
    <div className="h-[40svh]  py-2 flex flex-col text-white justify-evenly items-center">
      <div className="socials flex gap-8 p-4 ">
        <a href="/" className="flex gap-2 items-center">
          <img src={github} alt="logo" width={30} height={30} />
        </a>

        <a href="/" className="flex gap-2 items-center">
          <img src={lkdn} alt="logo" width={30} height={30} />
        </a>

        <a href="/" className="flex gap-2 items-center">
          <img src={youtube} alt="logo" width={30} height={30} />
        </a>
      </div>
      <div className="asOne  flex justify-evenly gap-4 text-xs md:text-lg">
        <a href="/" className="flex gap-2 items-center">
          Services
        </a>
        <a href="/" className="flex gap-2 items-center">
          About
        </a>
        <a href="/" className="flex gap-2 items-center">
          Blog
        </a>
      </div>
      <div className="asTwo flex gap-4 text-xs lg:text-lg md:text-lg">
        <a href="/" className="flex gap-2 items-center">
          Privacy policy
        </a>
        <a href="/" className="flex gap-2 items-center">
          Terms of use
        </a>
        <a href="/" className="flex gap-2 items-center">
          Cookie policy
        </a>
      </div>
      <h4 className="text-xs lg:text-lg md:text-lg">©️ 2024 Vedant.dev</h4>
    </div>
  );
}
