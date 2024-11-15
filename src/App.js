import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Import loadSlim for minimal setup
import QrCodeGenerator from "./QrCodeGenerator";
import Logo from "./Logo";
import "animate.css";

const App = () => {
  const [init, setInit] = useState(false);

  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#121212", // Background color
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push", // Click event mode
          },
          onHover: {
            enable: true,
            mode: "bubble", // Hover event mode set to bubble
          },
        },
        modes: {
          bubble: {
            distance: 200,
            size: 40, // Size of bubbles on hover
            duration: 2,
            opacity: 0.8,
            speed: 3,
          },
          push: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Particle color
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1, // Particle speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 20, // Number of particles
        },
        opacity: {
          value: {
            min: 0.1,
            max: 0.3,
          },
        },
        shape: {
          type: "circle", // Shape of particles
        },
        size: {
          value: { min: 10, max: 40 }, // Size range of particles
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <div
        className="main"
        style={{ overflow: "hidden", position: "relative", paddingBottom: 20, paddingTop: 20 }}
      >
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particlesOptions}
        />
        <div
          className="animate__animated animate__fadeInUp animate__fast"
          style={{ animationDelay: "300ms" }}
        >
          <Logo />
        </div>
        <div
          className="animate__animated animate__fadeInUp animate__fast"
          style={{ animationDelay: "600ms" }}
        >
          <QrCodeGenerator />
        </div>
      </div>
    );
  }

  return <></>;
};

export default App;
