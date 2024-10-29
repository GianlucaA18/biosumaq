import { Button } from "../ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer className="text-sm text-neutral-500 dark:text-neutral-400">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
          <div className="flex gap-4">
            <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[50px] w-[50px] rounded-lg">
              <img
                src="/img/logo.jpg"
                alt="Success"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <span className="uppercase text-black text-xl font-bold dark:text-white mt-3 ">FishFood</span>
          </div>
          <nav className="flex flex-col md:flex-row gap-4">
            <ul className="flex flex-col md:flex-grow gap-2">
              <li>
                <Link href="/" className="p-2 text-lg hover:text-black md:text-sm font-bold dark:hover:text-neutral-300 dark:text-white dark:font-bold">Inicio</Link>
              </li>
              <li>
                <Link href="/about" className="p-2 text-lg hover:text-black md:text-sm font-bold dark:hover:text-neutral-300 dark:text-white dark:font-bold">Sobre Nosotros</Link>
              </li>
              <li>
                <Link href="/productos" className="p-2 text-lg hover:text-black md:text-sm font-bold dark:hover:text-neutral-300 dark:text-white dark:font-bold">Productos</Link>
              </li>
              <li>
                <Link href="/novedades" className="p-2 text-lg hover:text-black md:text-sm font-bold dark:hover:text-neutral-300 dark:text-white dark:font-bold">Novedades</Link>
              </li>
            </ul>
          </nav>
          {/* <div className="flex flex-col md:ml-auto">
            <span className="mb-2 text-neutral-500  dark:text-white dark:font-bold">Déjanos tu email para estar atento a nuestras novedades</span>
            <input
              type="text"
              className="border border-neutral-300 p-2 rounded-lg mb-2 text-black dark:border-neutral-700 dark:bg-black dark:text-white"
              placeholder="Tu email"
            />
            <Button>Enviar</Button>
          </div> */}
       
        </div>
        <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 min-[1320px]:px-0">
            <p>© 2024 FishFood. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;