import Footer from "@/components/landing/footer";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

interface Feature {
  title: string;
  description: string;
  video?: string;
}

const HomePage = () => {
  const mainFeatures: Feature[] = [
    {
      title: "Polished & Efficient Interface",
      description:
        "WHAT-ABOUT features a high-fidelity interface built with Tailwind CSS and Shadcn UI components, ensuring full accessibility and a 100% responsive design across all devices. The UI’s near-instant response time is a key highlight, guaranteeing a seamless and fluid user experience.",
      video: "/interaction.webm",
    },
    {
      title: "Ironclad Security",
      description:
        "In our application, we ensure ironclad security by utilizing encrypted tokens that are only accessible via the server to validate user identity. We also implement a secure session refresh system, guaranteeing that users experience zero interruptions while maintaining a seamless and fluid journey throughout the platform.",
      video: "security.webm",
    },
    {
      title: "Scalability & Peak Performance",
      description:
        "Built on a modular NestJS architecture and following industry-standard design patterns, our backend ensures exceptional scalability and reliability. Combined with a highly optimized PostgreSQL database and Server-Side Rendering (SSR), we deliver ultra-fast initial load times and a robust infrastructure capable of handling demanding workloads.",
      video: "/performance.webm",
    },
  ];
  return (
    <div>
      <main className="max-w-5xl mx-auto">
        <section className="w-full min-h-dvh grid place-content-center relative">
          <div className="flex flex-col justify-center items-center max-w-2xl mx-auto px-2">
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-100" id="title">
                What - <span className="text-violet-600">About</span>
              </h1>
              <span className="text-sm text-end w-full block text-gray-100">
                by Diogenes Fermin
              </span>
            </div>

            <article className="w-full mt-5">
              <p className="px-4 md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-2xl">
                A high-performance microblogging platform designed for sharing
                ideas, debating, and connecting in real time. Built with a
                robust Full Stack architecture, it focuses on delivering a
                seamless user experience and handling dynamic interactions on
                par with modern social networks.
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
            <ArrowDown className="mx-auto" />
          </div>
        </section>

        <section className="min-h-dvh w-full py-2 px-5">
          <div className="mt-4 mb-6 text-center">
            <h1 className="text-2xl font-bold">
              Main <span className="text-violet-600">Features</span>
            </h1>
          </div>

          <div className="flex flex-col gap-4 max-w-105 lg:max-w-full mx-auto">
            {mainFeatures.map((feature, i) => (
              <article
                key={i}
                className="flex flex-col-reverse lg:flex-row border border-gray-700 rounded-lg min-h-60"
              >
                <div className="py-2 px-4">
                  <span className="text-xl font-bold block py-2">
                    {feature.title}
                  </span>
                  <p className="leading-relaxed">{feature.description}</p>
                </div>

                <div className="w-full max-w-105 mx-auto overflow-hidden rounded-xl aspect-video">
                  <video
                    src={feature.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  ></video>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
