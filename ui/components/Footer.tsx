import React from "react";
import { footerLinks } from "@/constants";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="w-full bg-stone-200">
      <footer className=" text-black-100  mt-5 mx-auto border-t border-gray-100 max-w-[1440px] items-centre md:px-16 sm:px-10 px-6">
        <div className="sm:flex justify-between">
          {footerLinks.map((items) => (
            <div key={items.title}>
              <p className="text-lg pt-16 pb-2">{items.title}</p>
              <div>
                {items.links.map((link) => (
                  <>
                    <Link className="py-6" href={link.link}>
                      {link.title}
                    </Link>
                    <br />
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-24">
          <p>&copy; 2023 Coursalysis, inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
