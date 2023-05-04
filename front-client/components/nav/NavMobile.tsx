import Image from "next/image";
import { useState } from "react";
import NavSettings from "./NavSettings";
import Link from "next/link";

export default function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div id="navMobile">
        <Link href={"/"}>
          <Image src="/logo.png" width={75} height={75} alt="Logo" />
        </Link>
        <button id="ButtonMobile" onClick={handleToggle}>
          {isOpen ? (
            <Image
              src="/svg/OpenNav.svg"
              width={38}
              height={25}
              alt="Open Nav"
            />
          ) : (
            <Image
              src="/svg/CloseNav.svg"
              width={38}
              height={25}
              alt="Close Nav"
            />
          )}
        </button>
      </div>

      {isOpen && (
        <div id="navModal">
          <div className="modal-content">
            <h3>Acceuil</h3>
            <h3>Search</h3>
            <h3>Article</h3>
          </div>
        </div>
      )}
    </>
  );
}
