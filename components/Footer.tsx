"use client";

import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

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
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-600">
          {user.firstName}
        </h1>
        <p className="text-14 truncate text-gray-700 font-normal">
          {user.email}
        </p>
      </div>
      {/* <div className="footer_image" onClick={handleLogout}>
        <Image src="icons/logout.svg" fill alt="logout" />
      </div> */}
      <Dialog>
        <div className="footer_image">
          <DialogTrigger asChild>
            <Image src="icons/logout.svg" fill alt="logout" />
          </DialogTrigger>
        </div>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button variant="default" type="button" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
