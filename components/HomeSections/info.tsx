import Image from "next/image";
import React from "react";
import blob from "@/assets/blob.png";

export default function info() {
  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto max-sm:px-8">
          <div className="lg:px-12 py-12 flex flex-col justify-center items-center text-center gap-8">
            <div>
              <Image src={blob} alt="..." className="w-24" />
            </div>
            <div className="w-full lg:w-4/12 mx-auto">
              <h1 className="text-2xl lg:text-4xl text-black font-medium">
                Bring the best of open source to you, your team, and your
                company
              </h1>
            </div>
            <div className="w-full lg:w-4/12 mx-auto">
              <p>
                Relied upon by more than 17 million developers worldwide, npm is
                committed to making JavaScript development elegant, productive,
                and safe. The free npm Registry has become the center of
                JavaScript code sharing, and with more than two million
                packages, the largest software registry in the world. Our other
                tools and services take the Registry, and the work you do around
                it, to the next level.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
