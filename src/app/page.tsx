import { ArrowDown } from "lucide-react";
import Link from "next/link";

interface Feature {
  title: string
  description: string
}

const HomePage = () => {
  const mainFeatures: Feature[] = [
    {
      title:"Lightning-Fast Real-Time Engine",
      description: "Built for zero-latency. Likes, threads, and dynamic feeds sync instantly across all active sessions, keeping users hooked without a single page reload."
    },
    {
      title:"Enterprise-Grade Scalability",
      description: "Engineered to handle massive data flows. The backend is heavily optimized for complex follower graphs and viral content propagation without breaking a sweat."
    },
    {
      title: "Frictionless User Journey",
      description: "Delivering a fluid, app-like experience on the web. Powered by advanced state management and intuitive UI patterns to guarantee maximum user satisfaction across any device."
    }
  ]
  return (
    <main className="max-w-5xl mx-auto">
      <section className="w-full min-h-dvh grid place-content-center relative">

        <div className="flex flex-col justify-center items-center max-w-2xl mx-auto px-2">
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-100">
              What - <span className="text-violet-600">About</span>
            </h1>
            <span className="text-sm text-end w-full block text-gray-100">
              by Diogenes Fermin
            </span>
          </div>

          <article className="w-full mt-5">
            <p className="px-4 md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-2xl">
              A high-performance microblogging platform designed for sharing
              ideas, debating, and connecting in real time. Built with a robust
              Full Stack architecture, it focuses on delivering a seamless user
              experience and handling dynamic interactions on par with modern
              social networks.
            </p>
          </article>

          <div className="w-full flex justify-center mt-6 gap-4">
            <Link
              href={"https://github.com/DiogenesFerminS/what-about-frontend"}
              target="_blank"
              className="py-2 px-4 block border border-violet-600 rounded-lg hover:scale-105 hover:bg-violet-900 transition-all"
            >
              Go to source
            </Link>

            <Link
              href={"/wa"}
              className="py-2 px-4 block bg-violet-600 rounded-lg hover:scale-105 hover:bg-violet-900 transition-all"
            >
              Go to Login
            </Link>
          </div>
        </div>

        <div className="absolute bottom-2 animate-more-up-down w-full">
          <ArrowDown 
            className="mx-auto"
          />
        </div>
      </section>

      <section className="min-h-dvh w-full py-2 px-4">
        <div className="w-full mt-4 mb-5">
          <h2 className="text-center block font-bold text-2xl">Main features</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 mx-auto lg:flex-row ">
          {
            mainFeatures.map((feature, i) => (
              <div key={i} className="border border-violet-600 max-w-100 rounded-lg py-4 px-4 h-70" >
                <span className="text-lg md:text-xl font-bold text-center block py-3">{feature.title}</span>
                <p>{feature.description}</p>
              </div>
            ))
          }
        </div>

      </section>
    </main>
  );
};

export default HomePage;
