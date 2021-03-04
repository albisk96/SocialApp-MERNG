export const particlesMainBackground = {
  background: {
    color: {
      value: "#000000",
    },
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
  fullScreen: {
    enable: true,
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      grab: {
        distance: 400,
      },
    },
  },
  particles: {
    color: {
      value: "#ff0000",
      animation: {
        enable: true,
        speed: 20,
      },
    },
    links: {
      color: {
        value: "#ffffff",
      },
      enable: true,
      opacity: 0.4,
    },
    move: {
      attract: {
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      enable: true,
      outModes: {
        bottom: "out",
        left: "out",
        right: "out",
        top: "out",
      },
      speed: 6,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
      animation: {
        minimumValue: 0.1,
        speed: 3,
      },
    },
    shape: {
      options: {
        polygon: {
          nb_sides: 5,
        },
        star: {
          nb_sides: 5,
        },
        image: {
          src: "https://particles.js.org/images/github.svg",
          width: 100,
          height: 100,
        },
        images: {
          src: "https://particles.js.org/images/github.svg",
          width: 100,
          height: 100,
        },
      },
    },
    size: {
      random: {
        enable: true,
      },
      animation: {
        minimumValue: 0.1,
        speed: 20,
      },
    },
  },
};
