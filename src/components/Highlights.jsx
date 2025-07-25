import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils/index";
import VidepCarousel from "./VideoCarousel";

const HighLights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
    gsap.to('.link', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    })
  }, []);
  return (
    <section id="highlights" className="w-full overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end md:flex justify-between">
          <p id="title" className="section-heading">
            Get the highlights.
          </p>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the even
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        <VidepCarousel />
      </div>
    </section>
  );
}

export default HighLights;