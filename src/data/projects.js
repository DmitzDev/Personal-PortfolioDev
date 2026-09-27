import mitchBlogImg from '../assets/MitchBlog.png';
import NarutoMonopolyImg from '../assets/Monopoly.png';
import PortfolioImg from '../assets/Portfolio.png';
import tambayanLogoImg from '../assets/tambayan_t_logo.png';

export const projects = [
  {
    id: 1,
    title: "MDev. | Blog",
    description: "A modern personal blog platform for sharing insights, tutorials, and my development journey.",
    shortDescription: "A modern personal blog and content platform.",
    technologies: ["React", "Html", "NodeJs", "Firebase", "Github"],
    features: [
      "Dynamic blog post routing and rendering",
      "Real-time database integration with Firebase",
      "Responsive and interactive user interface",
      "Content management and categorization",
      "Seamless deployment and version control",
    ],
    category: ["School Projects"],
    image: mitchBlogImg,
    liveDemo: "https://mitch-dev-blog.web.app",
    github: "https://github.com/DmitzDev/Mitch-Dev-Blog",
    date: "2026-07",
    status: "Completed",
  },
  {
    id: 2,
    title: "Naruto-Monopoly Game",
    description: "A full-featured Naruto-Monopoly game that handles player movements, dice rolls, property purchases, and battle simulations. Built with a modern responsive interface.",
    shortDescription: "Full-featured Naruto-Monopoly game with dice rolls, property purchases, and battle simulations.",
    technologies: ["React", "CSS", "NodeJs"],
    features: [
      "Player movements and dice rolls",
      "Property purchases and management",
      "Battle simulations",
    ],
    category: ["School Projects"],
    image: NarutoMonopolyImg,
    liveDemo: "https://naruto-monopoly-mitchdev.web.app",
    github: "https://github.com/DmitzDev/Naruto-Monopoly-MitchDev.",
    date: "2025-06",
    status: "Completed",
  },
  {
    id: 5,
    title: "Personal Portfolio",
    description: "A modern, responsive personal portfolio website built with React and Vite. Features dark/light mode, smooth animations, glassmorphism design, and optimized for performance.",
    shortDescription: "Modern personal portfolio with dark mode, animations, and glassmorphism design.",
    technologies: ["React", "JavaScript", "CSS", "Vite", "Firebase"],
    features: [
      "Dark/Light mode toggle with system preference detection",
      "Smooth scroll animations and micro-interactions",
      "Responsive design for all devices",
      "Project filtering and search",
      "Contact form integration",
    ],
    category: ["Personal Projects"],
    image: PortfolioImg,
    liveDemo: "#",
    github: "#",
    date: "2026",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Tambayan App",
    description: "Tambayan is a mobile social networking platform inspired by Facebook, designed for users to connect, share updates, and interact within a centralized community hub.",
    shortDescription: "A mobile social networking application inspired by Facebook.",
    technologies: ["Flutter", "Dart", "NodeJs", "Firebase"],
    features: [
      "Social feed and status updates",
      "User profiles and following system",
      "Real-time chat and comments",
    ],
    category: ["Mobile Apps"],
    image: tambayanLogoImg,
    liveDemo: "#",
    github: "#",
    date: "2026",
    status: "In Progress",
  }
];

export const projectCategories = [
  "All",
  "Web Applications",
  "Mobile Apps",
  "UI/UX Design",
  "School Projects",
  "Freelance Work",
  "Personal Projects",
];
