"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Code, Award, Boxes } from "lucide-react";

// Mock components — update these to your real ones
const CardProject = ({ Img, Title, Description, Link }) => (
  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
    <img src={Img} alt={Title} className="aspect-video rounded mb-3 object-cover" />
    <h3 className="text-white font-semibold mb-2">{Title}</h3>
    <p className="text-slate-400 text-sm">{Description}</p>
  </div>
);

const Certificate = ({ ImgSertif }) => (
  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
    <img
      src={ImgSertif}
      alt="Certificate"
      className="aspect-[4/3] rounded object-cover"
    />
  </div>
);

const TechStackIcon = ({ IconSrc, Language }) => (
  <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
    <img src={IconSrc} alt={Language} className="w-12 h-12 mb-2 object-contain" />
    <span className="text-slate-300 text-xs text-center">{Language}</span>
  </div>
);

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full" />
  </button>
);

const CustomSwipeableViews = ({ children, index, onChangeIndex }) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  useEffect(() => {
    const pos = -index * 100;
    setCurrentTranslate(pos);
    setPrevTranslate(pos);
  }, [index]);

  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };
  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setCurrentTranslate(prevTranslate + (diff / window.innerWidth) * 100);
  };
  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentTranslate - prevTranslate;
    const threshold = 20;
    if (Math.abs(diff) > threshold) {
      onChangeIndex(diff > 0 && index > 0 ? index - 1 : index < children.length - 1 ? index + 1 : index);
    }
    const pos = -index * 100;
    setCurrentTranslate(pos);
    setPrevTranslate(pos);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full"
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      onMouseDown={(e) => (e.preventDefault(), handleStart(e.clientX))}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div
        className="flex w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${isDragging ? currentTranslate : -index * 100}%)`, cursor: isDragging ? "grabbing" : "grab" }}
      >
        {children.map((child, i) => (
          <div key={i} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

function TabPanel({ children, index, value }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      className="p-1 sm:p-3"
    >
      {children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [initialItems, setInitialItems] = useState(6);

  useEffect(() => {
    const handleResize = () => setInitialItems(window.innerWidth < 768 ? 4 : 6);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mockProjects = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      Img: `https://picsum.photos/id/${i + 10}/400/225`,
      Title: `Project ${i + 1}`,
      Description: `Description for project ${i + 1}`,
      Link: "#",
    }));
    const mockCertificates = Array.from({ length: 9 }, (_, i) => ({
      Img: `https://picsum.photos/id/${i + 100}/400/300`,
    }));
    setProjects(mockProjects);
    setCertificates(mockCertificates);
  }, []);

  // const techStacks = [
  //   { icon: "/icons/html.svg", language: "HTML" },
  //   { icon: "/icons/css.svg", language: "CSS" },
  //   { icon: "/icons/javascript.svg", language: "JavaScript" },
  //   { icon: "/icons/reactjs.svg", language: "ReactJS" },
  //   // ...add the rest here
  // ];
  const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "Python.svg", language: "Python" },
  { icon: "FastAPI.svg", language: "FastAPI" },
  { icon: "Django.svg", language: "Django" },
  { icon: "Redis.svg", language: "Redis" },
  { icon: "PostgresSQL.svg", language: "PostgresSQL" },
  { icon: "Mongodb.svg", language: "Mongodb" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "AWS.svg", language: "AWS" },
  { icon: "Git.svg", language: "Git" },
  { icon: "docker.svg", language: "docker" },
]

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  const toggle = (t) => (t === "projects" ? setShowAllProjects((p) => !p) : setShowAllCertificates((p) => !p));

  return (
    <div className="md:px-[10%] px-[5%] w-full mt-[3rem] sm:mt-0 bg-[#030014] overflow-hidden" id="Portfolio">
      <div className="text-center pb-10">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      <div className="bg-transparent border border-white/10 rounded-[20px] relative overflow-hidden md:px-4" style={{ backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.03)" }}>
        <div className="flex w-full min-h-[70px]">
          {[
            { icon: Code, label: "Projects", idx: 0 },
            { icon: Award, label: "Certificates", idx: 1 },
            { icon: Boxes, label: "Tech Stack", idx: 2 },
          ].map(({ icon: Icon, label, idx }) => (
            <button
              key={idx}
              onClick={() => setValue(idx)}
              className={`flex-1 flex flex-col items-center justify-center text-sm md:text-base font-semibold transition-all duration-300 py-5 mx-2 rounded-xl ${
                value === idx
                  ? "text-white bg-gradient-to-br from-purple-500/20 to-blue-500/20 shadow-purple-500/20 shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-purple-500/10 hover:-translate-y-0.5"
              }`}
              {...a11yProps(idx)}
            >
              <Icon className={`mb-2 w-5 h-5 transition-all duration-300 ${value === idx ? "text-purple-300 scale-110" : ""}`} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <CustomSwipeableViews index={value} onChangeIndex={setValue}>
        <TabPanel value={value} index={0}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedProjects.map((p) => (
              <CardProject key={p.id} {...p} />
            ))}
          </div>
          {projects.length > initialItems && (
            <div className="mt-6 flex justify-start">
              <ToggleButton onClick={() => toggle("projects")} isShowingMore={showAllProjects} />
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {displayedCertificates.map((c, i) => (
              <Certificate key={i} ImgSertif={c.Img} />
            ))}
          </div>
          {certificates.length > initialItems && (
            <div className="mt-6 flex justify-start">
              <ToggleButton onClick={() => toggle("certificates")} isShowingMore={showAllCertificates} />
            </div>
          )}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-8 pb-[5%]">
            {techStacks.map((s, i) => (
              <TechStackIcon key={i} IconSrc={s.icon} Language={s.language} />
            ))}
          </div>
        </TabPanel>
      </CustomSwipeableViews>
    </div>
  );
}
