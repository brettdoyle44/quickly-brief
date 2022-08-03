import React, { FunctionComponent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  children: any;
  href: any;
}

const NavLink: FunctionComponent<Props> = ({ children, href }) => {
  const child = React.Children.only(children);
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      {React.cloneElement(child, {
        "aria-current": asPath === href || null,
      })}
    </Link>
  );
};

export default NavLink;
