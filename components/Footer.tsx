"use client";

import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const loggedOut = await logoutAccount();

      if (loggedOut) router.push("/sign-in");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user.name[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-600">
          {user.name}
        </h1>
        <p className="text-14 truncate text-gray-700 font-normal">
          {user.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogout}>
        <Image src="icons/logout.svg" fill alt="logout" />
      </div>
    </footer>
  );
};

export default Footer;
