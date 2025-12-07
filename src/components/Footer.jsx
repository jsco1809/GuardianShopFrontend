import logo from "../assets/logo.svg";
import phone from "../assets/phone.svg";
import location from "../assets/location.svg";
import world from "../assets/world.svg";
import { Link } from "react-router-dom";
import meta from "../assets/meta.svg";
import tiktok from "../assets/tiktok.svg";
import instagram from "../assets/Instagram.svg";
import twitter from "../assets/twitter.svg";
import WhatsApp from "../assets/WhatsApp.svg";

const Footer = () => {
  return (
    <div
      className="bottom-0 
                bg-tertiary dark:bg-fifthy 
                w-full h-full 
                flex flex-wrap justify-center items-center lg:justify-between 
                text-xs 
                text-black dark:text-white 
                p-4"
    >
      {/* LOGO + INFO */}
      <div
        className="
          w-[300px] md:w-[256px] lg:w-[300px] 
          h-[97px] lg:ml-8 
          flex gap-4 
          border-black dark:border-white 
          border-r-2 
          mb-4
        "
      >
        {/* LOGO */}
        <img
          src={logo}
          alt=""
          width="80"
          height="80"
          className=" invert brightness-100 dark:invert dark:brightness-100"
        />

        {/* ICONOS */}
        <div className="justify-center place-content-center">
          <img
            src={phone}
            alt=""
            className="mb-1 brightness-0 dark:invert dark:brightness-100"
          />
          <img
            src={location}
            alt=""
            className="mb-1 brightness-0 dark:invert dark:brightness-100"
          />
          <img
            src={world}
            alt=""
            className="mb-1 brightness-0 dark:invert dark:brightness-100"
          />
        </div>

        {/* TEXTO */}
        <div className="justify-center place-content-center">
          <ol>
            <li className="mb-2">
              <Link
                to="https://api.whatsapp.com/send/?phone=%2B573205159915&text&type=phone_number&app_absent=0"
                className="underline"
              >
                +573205159915
              </Link>
            </li>

            <li className="mb-2">Cr 24 # 1 - 135 Sur - Madrid/Cundinamarca</li>

            <li className="mb-2">
              <Link
                to="https://github.com/PEDRAZA2645/GuardianShop_Front"
                className="underline"
              >
                www.GuardianShop.com
              </Link>
            </li>
          </ol>
        </div>
      </div>

      {/* ENLACES */}
      <div
        className="
          w-[300px] md:w-[256px] lg:w-[300px] 
          h-[97px] 
          border-black dark:border-white 
          border-r-2 
          mb-4 
          flex
        "
      >
        <h1 className="p-4 uppercase ml-4">Enlaces</h1>
        <ol className="p-4">
          <li className="mb-1">
            <Link to="/">Inicio</Link>
          </li>
          <li className="mb-1">
            <Link to="/products">Productos</Link>
          </li>
          <li className="mb-1">
            <Link to="/contactForm">Contactenos</Link>
          </li>
          <li className="mb-1">Support</li>
        </ol>
      </div>

      {/* REDES SOCIALES */}
      <div
        className="
          w-[300px] md:w-[256px] lg:w-[300px] 
          h-[97px] 
          border-black dark:border-white 
          border-r-2 
          mb-4
        "
      >
        <h1 className="uppercase p-4">redes sociales</h1>

        <ol className="flex gap-8 ml-4">
          <li>
            <img
              src={meta}
              width="20"
              className="brightness-0 dark:invert"
            />
          </li>
          <li>
            <img
              src={tiktok}
              width="20"
              className="brightness-0 dark:invert"
            />
          </li>
          <li>
            <img
              src={instagram}
              width="20"
              className="brightness-0 dark:invert"
            />
          </li>
          <li>
            <img
              src={twitter}
              width="20"
              className="brightness-0 dark:invert"
            />
          </li>
          <li>
            <img
              src={WhatsApp}
              width="20"
              className="brightness-0 dark:invert"
            />
          </li>
        </ol>
      </div>

      {/* ACCIÓN FINAL */}
      <div
        className="
          w-[300px] h-[97px] 
          md:w-[768px] md:h-[50px] 
          lg:w-[300px] lg:h-[97px] 
          md:flex lg:flex-wrap 
          justify-center md:justify-between lg:justify-start 
          place-content-center 
          p-3 md:p-4 
          border-black dark:border-white 
          border-r-2
        "
      >
        <h1 className="mb-2 md:mt-0 uppercase lg:mr-5">
          ¿Qué quieres hacer?
        </h1>

        <p className="mt-2 md:mt-0 lg:mt-5">
          © 2024 <span className="font-bold">GuardianShop</span> || Todos los
          derechos reservados
        </p>
      </div>
    </div>
  );
};

export default Footer;
