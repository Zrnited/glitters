import logo from "@/assets/images/footer-logo.png";
import Link from "next/link";
import Image from "next/image";
import xIcon from "@/assets/icons/x-icon.png";
import instaIcon from "@/assets/icons/instagram-icon.png";
import facebookIcon from "@/assets/icons/facebook-icon.png";
import linkedinIcon from "@/assets/icons/linkedIn-icon.png";

export default function Footer() {
  const icons = [
    {
      icon: xIcon,
      link: "https://x.com/glitters",
      name: "x-icon",
    },
    {
      icon: instaIcon,
      link: "https://instagram.com/glitters",
      name: "instagram-icon",
    },
    {
      icon: facebookIcon,
      link: "https://facebook.com/glitters",
      name: "facebook-icon",
    },
    {
      icon: linkedinIcon,
      link: "https://linkedin.com/glitters",
      name: "linkedin-icon",
    },
  ];

  return (
    <footer className="p-3">
      <div className="bg-[#2E2729] text-white p-5 lg:text-lg">
        <div className="flex flex-row justify-between">
          <Image src={logo} alt="logo" className="w-[101px] h-[30px] lg:w-[340px] lg:h-[100px]" />
          <div className="flex flex-col items-center gap-y-2">
            <ul className="flex flex-row gap-x-4">
              {icons?.map((link, index) => {
                return (
                  <li key={index}>
                    <a href={link.link}>
                      <Image
                        src={link.icon}
                        className="w-[30px] h-auto rounded-sm"
                        priority
                        alt={link.name}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p>HQed at Kubwa, Abuja.</p>
          </div>
        </div>
        <ul className="flex flex-row gap-x-4 justify-between items-center px-4 py-8 md:justify-center md:gap-x-10">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/"}>Store</Link>
          </li>
          <li>
            <Link href={"/"}>Cart</Link>
          </li>
          <li>
            <Link href={"/"}>About us</Link>
          </li>
        </ul>
        <p className="text-center mt-10">All copyrights reserved.</p>
      </div>
    </footer>
  );
}
