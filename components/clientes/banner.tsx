"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Banner = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const res = await fetch("/api/banner/getBannerImage");
        if (res.ok) {
          const data = await res.json();
          setBannerImage(data.image);
        }
      } catch (error) {
        console.error("Error al obtener la imagen del banner:", error);
        setBannerImage(null);
      }
    };

    fetchBannerImage();
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* SVG difuminado detrás de la imagen del banner */}
      <svg
        className="absolute inset-0 -z-10 blur-3xl"
        fill="none"
        viewBox="0 0 400 400"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_10_20)">
          <g filter="url(#filter0_f_10_20)">
            <path
              d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
              fill="#03FFE0"
            ></path>
            <path
              d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
              fill="#7C87F8"
            ></path>
            <path
              d="M320 400H400V78.75L106.2 134.75L320 400Z"
              fill="#4C65E4"
            ></path>
            <path
              d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
              fill="#043AFF"
            ></path>
          </g>
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="720.666"
            id="filter0_f_10_20"
            width="720.666"
            x="-160.333"
            y="-160.333"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              mode="normal"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              result="effect1_foregroundBlur_10_20"
              stdDeviation="80.1666"
            ></feGaussianBlur>
          </filter>
        </defs>
      </svg>

      {bannerImage && (
        <div className="relative z-5">
          <Image
            src={bannerImage}
            alt="Banner"
            width={700}
            height={700}
            className="mx-auto p-4"
          />
        </div>
      )}

      {bannerImage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-2">
          <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none text-primary">
            FishFood
          </h1>
          <span className="text-lg md:text-xl mb-4 font-light text-white">
            Disfruta el sabor del mar en cada bocado
          </span>
          <Button>
            <Link href="/productos">
              Productos
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Banner;
