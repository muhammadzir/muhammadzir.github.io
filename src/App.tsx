import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Instagram, 
  Facebook, 
  Mail, 
  ExternalLink, 
  Moon, 
  Sun, 
  Code, 
  User, 
  Briefcase, 
  MessageSquare,
  Globe,
  Send,
  BookOpen,
  X,
  ArrowUp
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  longDescription: string;
  githubLink: string;
  technologies: string[];
}

// --- Components ---

const TypingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="font-mono font-bold text-xl md:text-2xl">
      {`${texts[index].substring(0, subIndex)}`}<span className="animate-pulse">|</span>
    </span>
  );
};

const ProjectCard = ({ title, description, tags, index, image, onClick }: { title: string, description: string, tags: string[], index: number, image?: string, onClick: () => void, [key: string]: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    whileHover={{ 
      scale: 1.03, 
      rotate: -1.5,
      x: -4,
      y: -4,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }}
    onClick={onClick}
    className="neo-box p-6 flex flex-col h-full cursor-pointer group"
  >
    {image && (
      <div className="mb-4 border-4 border-black overflow-hidden aspect-video bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
    )}
    <h3 className="text-2xl font-black mb-2 uppercase">{title}</h3>
    <p className="mb-4 flex-grow opacity-80 line-clamp-2">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tags.map(tag => (
        <span key={tag} className="px-2 py-1 bg-[var(--accent-secondary)] text-black text-xs font-bold border-2 border-black">
          {tag}
        </span>
      ))}
    </div>
    <button 
      className="neo-button bg-[var(--accent-tertiary)] text-black inline-flex items-center justify-center gap-2 w-full"
    >
      View Details <ExternalLink size={18} />
    </button>
  </motion.div>
);

const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, rotate: -2, y: 50 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        exit={{ scale: 0.9, rotate: 2, y: 50 }}
        className="neo-box bg-[var(--bg)] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black text-white border-4 border-black hover:bg-[var(--accent)] hover:text-black transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-6 md:p-10">
          <div className="border-4 border-black mb-8 overflow-hidden aspect-video">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">{project.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-[var(--accent)] text-black text-sm font-black border-2 border-black uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-6 text-lg">
            <p className="font-medium leading-relaxed opacity-90">
              {project.longDescription}
            </p>

            <div>
              <h3 className="text-xl font-black mb-3 uppercase flex items-center gap-2">
                <Code size={20} /> Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map(tech => (
                  <div key={tech} className="px-3 py-1 bg-white border-2 border-black font-bold text-sm">
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-button bg-[var(--accent-secondary)] text-black flex-1 flex items-center justify-center gap-2 text-center"
              >
                Live Demo <ExternalLink size={20} />
              </a>
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-button bg-black text-white flex-1 flex items-center justify-center gap-2 text-center hover:bg-[var(--accent-tertiary)] hover:text-black"
              >
                GitHub Repo <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SocialLink = ({ icon: Icon, label, url, color, index }: { icon: any, label: string, url: string, color: string, index: number, [key: string]: any }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ 
      scale: 1.05, 
      rotate: index % 2 === 0 ? 2 : -2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }}
    whileTap={{ scale: 0.95 }}
    className="neo-button flex items-center justify-center gap-3 w-full py-6 text-black group relative overflow-hidden"
    style={{ backgroundColor: color }}
  >
    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    <Icon size={28} className="relative z-10 group-hover:scale-110 transition-transform" />
    <span className="font-black text-xl uppercase relative z-10">{label}</span>
  </motion.a>
);

const Preloader = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
      }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Blocks */}
        <div className="flex gap-4 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
                backgroundColor: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--accent-secondary)' : 'var(--accent-tertiary)'
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-12 h-12 border-4 border-white shadow-[4px_4px_0px_0px_white]"
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-black text-5xl md:text-7xl uppercase tracking-tighter"
        >
          {"LOADING".split("").map((char, i) => (
            <motion.span
              key={i}
              animate={{ 
                y: [0, -20, 0],
                color: ["#fff", "var(--accent)", "#fff"]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: i * 0.1 
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-2 bg-white mt-8 border-2 border-white shadow-[4px_4px_0px_0px_var(--accent)]"
        />
      </div>

      {/* Background decorative elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-64 h-64 border-8 border-white/10 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-96 h-96 border-8 border-white/10"
      />
    </motion.div>
  );
};

const FloatingBlock = ({ color, size, top, left, delay, rotate, speed }: { color: string, size: number, top: string, left: string, delay: number, rotate: number, speed: number, key?: any }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, speed * 400]);

  return (
    <motion.div
      style={{ 
        top, 
        left, 
        width: size, 
        height: size, 
        backgroundColor: color,
        y 
      }}
      initial={{ rotate }}
      animate={{ 
        y: [0, -20, 0],
        rotate: [rotate, rotate + 5, rotate],
      }}
      transition={{
        y: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut" },
        delay: delay * 0.5
      }}
      className="fixed border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-0 opacity-20 pointer-events-none"
    />
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'projects', 'blog', 'socials', 'contact'];
    
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const backgroundBlocks = [
    { color: 'var(--accent)', size: 120, top: '10%', left: '5%', delay: 0, rotate: -15, speed: -0.5 },
    { color: 'var(--accent-secondary)', size: 80, top: '25%', left: '85%', delay: 1, rotate: 10, speed: 0.3 },
    { color: 'var(--accent-tertiary)', size: 150, top: '60%', left: '10%', delay: 2, rotate: 5, speed: -0.2 },
    { color: 'var(--accent)', size: 100, top: '80%', left: '80%', delay: 1.5, rotate: -10, speed: 0.6 },
    { color: 'var(--accent-secondary)', size: 60, top: '40%', left: '15%', delay: 0.5, rotate: 20, speed: -0.4 },
    { color: 'var(--accent-tertiary)', size: 90, top: '15%', left: '70%', delay: 2.5, rotate: -5, speed: 0.2 },
  ];

  const tabs = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'socials', label: 'Socials', icon: Globe },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  const projects: Project[] = [
    {
      title: "Personal Portfolio",
      description: "A modern portfolio built with React and Neo Brutalism design principles.",
      longDescription: "This project is a deep dive into Neo Brutalism design, focusing on bold typography, high contrast colors, and heavy shadows. It uses Framer Motion for complex animations and Tailwind CSS for rapid styling.",
      tags: ["React", "Tailwind", "Motion"],
      technologies: ["React 18", "Framer Motion", "Tailwind CSS", "Lucide React", "TypeScript"],
      link: "https://ais-pre-d2cuvvjezyyw32p2d34yxn-419660979756.asia-southeast1.run.app",
      githubLink: "https://github.com/muhammadzir/portfolio",
      image: "https://picsum.photos/seed/portfolio/800/450"
    },
    {
      title: "E-Commerce UI",
      description: "Experimental shopping interface with bold colors and heavy shadows.",
      longDescription: "An experimental UI for an e-commerce platform that breaks traditional design rules. It features a dynamic cart system, product filtering, and a unique checkout experience all wrapped in a brutalist aesthetic.",
      tags: ["TypeScript", "CSS", "Vite"],
      technologies: ["TypeScript", "Vite", "PostCSS", "State Management", "Responsive Design"],
      link: "#",
      githubLink: "https://github.com/muhammadzir/ecommerce-ui",
      image: "https://picsum.photos/seed/ecommerce/800/450"
    },
    {
      title: "Task Manager",
      description: "A simple yet powerful tool to manage your daily tasks with a brutalist twist.",
      longDescription: "A productivity tool designed to be as straightforward as possible. It uses a local database for persistence and features drag-and-drop task organization with satisfying haptic-like animations.",
      tags: ["React", "SQLite", "Express"],
      technologies: ["React", "Express.js", "SQLite", "Node.js", "REST API"],
      link: "#",
      githubLink: "https://github.com/muhammadzir/task-manager",
      image: "https://picsum.photos/seed/tasks/800/450"
    }
  ];

  const socials = [
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/muhammad_zir', color: '#ff8787' },
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/muhammad.zir123', color: '#74c0fc' },
    { icon: Send, label: 'TikTok', url: 'https://www.tiktok.com/@zirdxd', color: '#63e6be' },
    { icon: Github, label: 'GitHub', url: 'https://github.com', color: '#e9ecef' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[var(--bg)]">
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-10" />

      {/* Floating 3D Neo Brutalist Blocks */}
      {backgroundBlocks.map((block, i) => (
        <FloatingBlock key={i} {...block} />
      ))}
      
      {/* Main Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Theme Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed top-6 right-6 z-50 neo-button bg-[var(--accent-tertiary)] text-black p-3 rounded-none"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-50 neo-button bg-[var(--accent)] text-black p-4 rounded-none shadow-[4px_4px_0px_0px_black]"
              aria-label="Back to Top"
            >
              <ArrowUp size={24} strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Content Container */}
        <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[var(--accent)] border-4 border-black rounded-full translate-x-3 translate-y-3" />
            <img 
              src="https://i.ibb.co.com/QFJNwSPy/profile.webp" 
              alt="Muhammad Zir" 
              className="w-40 h-40 rounded-full border-4 border-black object-cover relative z-10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mt-8 uppercase tracking-tighter text-center"
          >
            Muhammad Zir
          </motion.h1>
          <div className="mt-4 h-8">
            <TypingText texts={["Web Developer", "UI/UX Designer", "Creative Thinker"]} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-4 z-50 flex flex-wrap justify-center gap-4 mb-12 py-2">
          <div className="flex flex-wrap justify-center gap-4 p-2 bg-[var(--bg)]/80 backdrop-blur-md border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`neo-tab flex items-center gap-2 transition-all ${activeTab === tab.id ? 'neo-tab-active' : 'hover:bg-[var(--accent)]/20'}`}
              >
                <tab.icon size={20} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sections Content */}
        <div className="space-y-32 pb-32">
          {/* Home Section */}
          <section id="home" className="scroll-mt-32">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="space-y-6"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="neo-box p-8 bg-[var(--accent-secondary)] text-black"
              >
                <h2 className="text-3xl font-black mb-4 uppercase">About Me</h2>
                <p className="text-lg leading-relaxed font-medium mb-6">
                  Fullstack Nganggur! Hobi rebahan sambil scroll fesnuk.
                </p>
                <a 
                  href="https://zir.is-a.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neo-button bg-[var(--accent-tertiary)] text-black inline-flex items-center gap-2"
                >
                  Visit My Blog <BookOpen size={20} />
                </a>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="neo-box p-6 bg-[var(--accent-tertiary)] text-black"
                >
                  <h3 className="text-xl font-black mb-2 uppercase">Skills</h3>
                  <ul className="list-none space-y-1 font-bold">
                    <li>⚡ React & Next.js</li>
                    <li>🎨 Tailwind CSS</li>
                    <li>🛠️ Node.js & Express</li>
                    <li>📱 Responsive Design</li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="neo-box p-6 bg-[var(--accent)] text-black"
                >
                  <h3 className="text-xl font-black mb-2 uppercase">Interests</h3>
                  <ul className="list-none space-y-1 font-bold">
                    <li>🚀 Open Source</li>
                    <li>🎮 Game Development</li>
                    <li>📸 Photography</li>
                    <li>🎵 Music Production</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-32">
            <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter border-b-8 border-black inline-block">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <ProjectCard 
                  key={i} 
                  index={i} 
                  {...project} 
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </section>

          {/* Blog Section */}
          <section id="blog" className="scroll-mt-32">
            <div className="neo-box p-12 bg-[var(--accent-tertiary)] text-black text-center">
              <BookOpen size={64} className="mx-auto mb-6" />
              <h2 className="text-4xl font-black mb-4 uppercase">My Blog</h2>
              <p className="text-xl font-bold mb-8">
                Check out my latest articles about web development, design, and technology.
              </p>
              <a 
                href="https://zir.is-a.dev/blog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="neo-button bg-black text-white text-xl px-12 py-4 hover:bg-[var(--accent)] hover:text-black"
              >
                Go to Blog
              </a>
            </div>
          </section>

          {/* Socials Section */}
          <section id="socials" className="scroll-mt-32">
            <h2 className="text-4xl font-black mb-8 uppercase tracking-tighter border-b-8 border-black inline-block">Connect With Me</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {socials.map((social, i) => (
                <SocialLink key={i} index={i} {...social} />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, rotate: -2 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="neo-box p-8 bg-[var(--accent-secondary)] text-black"
            >
              <h2 className="text-3xl font-black mb-6 uppercase">Get In Touch</h2>
              <form 
                action="https://formsubmit.co/muhammadzir7@gmail.com" 
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label className="block font-black uppercase mb-1">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full border-4 border-black p-3 bg-white focus:outline-none focus:border-[var(--accent)] focus:shadow-[4px_4px_0px_0px_black] transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full border-4 border-black p-3 bg-white focus:outline-none focus:border-[var(--accent)] focus:shadow-[4px_4px_0px_0px_black] transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase mb-1">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    className="w-full border-4 border-black p-3 bg-white focus:outline-none focus:border-[var(--accent)] focus:shadow-[4px_4px_0px_0px_black] transition-all"
                    placeholder="Tell me something..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="neo-button bg-black text-white w-full flex items-center justify-center gap-2 hover:bg-[var(--accent)] hover:text-black"
                >
                  Send Message <Send size={20} />
                </button>
              </form>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-black py-8 mt-12 bg-[var(--bg)]">
        <div className="container mx-auto px-4 text-center">
          <p className="font-black text-lg uppercase tracking-wider">
            © {new Date().getFullYear()} Built with ♥️ By. Muhammad Zir
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://www.instagram.com/muhammad_zir" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] transition-colors"><Instagram size={24} /></a>
            <a href="https://www.facebook.com/muhammad.zir123" target="_blank" rel="noreferrer" className="hover:text-[var(--accent-secondary)] transition-colors"><Facebook size={24} /></a>
            <a href="mailto:muhammadzir7@gmail.com" className="hover:text-[var(--accent-tertiary)] transition-colors"><Mail size={24} /></a>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}
