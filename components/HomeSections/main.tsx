import React from "react";

export default function main() {
  return (
    <>
      <section className="mainBackground">
        <div className="container mx-auto max-sm:px-4">
          <div className="lg:w-1/2 py-24 mx-auto text-center flex flex-col gap-12 text-white">
            <h1 className="text-5xl lg:text-8xl text-center font-semibold">
              Build amazing things
            </h1>
            <div className="flex flex-col gap-6 lg:gap-12">
              <p className="text-base lg:text-lg w-full lg:w-3/4 mx-auto">
                We&apos;re GitHub, the company behind the npm Registry and npm
                CLI. We offer those to the community for free, but our day job
                is building and selling useful tools for developers like you.
              </p>
              <h3 className="text-3xl lg:text-4xl font-semibold w-full lg:w-3/4 mx-auto">
                Take your JavaScript development up a notch
              </h3>
              <p className="text-base w-full lg:w-3/4 mx-auto">
                Get started today for free, or step up to npm Pro to enjoy a
                premium JavaScript development experience, with features like
                private packages.
              </p>
            </div>
            <div className="flex max-sm:flex-col justify-center items-center gap-6">
              <button
                type="button"
                className="max-sm:w-full px-14 py-3 drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] bg-yellow-400 border-2 border-yellow-400 text-black font-semibold rounded-full"
              >
                Sign up for free
              </button>
              <button
                type="button"
                className="max-sm:w-full px-14 py-3 drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] bg-transparent border-2 border-white font-semibold rounded-full"
              >
                Learn about Pro
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
