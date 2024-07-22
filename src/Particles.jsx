// src/Particles.jsx
import React from "react";
import Particles from "react-tsparticles";

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#000000" // Black particles
    },
    shape: {
      type: "circle"
    },
    size: {
      value: 3
    },
    line_linked: {
      enable: false
    },
    move: {
      speed: 1
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      }
    },
    modes: {
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
};

function ParticleBackground() {
  return <Particles params={particlesOptions} style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, zIndex: -1 }} />;
}

export default ParticleBackground;
