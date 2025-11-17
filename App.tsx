import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import HyperspeedBackground from './components/HyperspeedBackground';
import PillNav from './components/PillNav';
import GlitchText from './components/GlitchText';
import RotatingText from './components/RotatingText';
import ElectricBorder from './components/ElectricBorder';
import SplashCursor from './components/SplashCursor';
import Ribbons from './components/Ribbons';
import InteractiveGallery from './components/InteractiveGallery';
import Stack from './components/Stack';
import InfiniteMenu from './components/InfiniteMenu';
import ClickSpark from './components/ClickSpark';
import SectionHeading from './components/SectionHeading';
import CreatorCard from './components/CreatorCard';
import { membersData, navLinks, contactLinks } from './constants';
import ContactForm from './components/ContactForm';
import Lightbox from './components/Lightbox';

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const memberColors = [
    ["#ff7e5f", "#feb47b"], // Orange/Yellow
    ["#00c9ff", "#92fe9d"], // Green/Blue
    ["#f7971e", "#ffd200"], // Gold
    ["#de6262", "#ffb88c"], // Pink/Peach
    ["#6dd5ed", "#2193b0"], // Light Blue
    ["#cc2b5e", "#753a88"], // Purple/Pink
    ["#e1eec3", "#f05053"], // Green/Red
  ];

  // -- Lightbox Logic --

  // Helper to get image data based on URL params
  const lightboxState = useMemo(() => {
    const category = searchParams.get('category');
    const indexParam = searchParams.get('image');
    
    if (!category || indexParam === null) return null;
    
    const member = membersData.find(m => m.id === category);
    if (!member) return null;
    
    const index = parseInt(indexParam, 10);
    if (isNaN(index) || index < 0 || index >= member.galleryImages.length) return null;

    return {
      category,
      index,
      imageSrc: member.galleryImages[index],
      total: member.galleryImages.length
    };
  }, [searchParams]);

  const openLightbox = (category: string, index: number) => {
    setSearchParams({ category, image: index.toString() });
  };

  const closeLightbox = () => {
    setSearchParams({});
  };

  const nextImage = () => {
    if (!lightboxState) return;
    const nextIndex = (lightboxState.index + 1) % lightboxState.total;
    // Use replace: true to update the URL without adding a new history entry
    setSearchParams({ category: lightboxState.category, image: nextIndex.toString() }, { replace: true });
  };

  const prevImage = () => {
    if (!lightboxState) return;
    const prevIndex = (lightboxState.index - 1 + lightboxState.total) % lightboxState.total;
    // Use replace: true to update the URL without adding a new history entry
    setSearchParams({ category: lightboxState.category, image: prevIndex.toString() }, { replace: true });
  };

  return (
    <div className="relative antialiased text-white bg-black font-['Poppins']">
      <SplashCursor />
      
      <Lightbox 
        isOpen={!!lightboxState}
        imageSrc={lightboxState?.imageSrc || ''}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        hasNext={!!lightboxState} // Always true for circular, or logic can be adjusted
        hasPrev={!!lightboxState}
      />

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
        <PillNav links={navLinks} />
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-24">
          <HyperspeedBackground colors={["#6007b8", "#140132", "#c850c0", "#4158d0", "#ffcc70"]} />
          <div className="relative z-10 p-4">
             <ElectricBorder>
                <div className="text-center p-8 md:p-12 lg:p-16 bg-black/50 backdrop-blur-sm">
                  <GlitchText text="We Are The Creatorz" className="text-5xl md:text-7xl lg:text-8xl font-bold font-['Fredoka'] tracking-wider mb-4" />
                  <RotatingText
                    texts={["Artists.", "Developers.", "Editors.", "Creators.", "Dreamers."]}
                    className="text-xl md:text-2xl lg:text-3xl font-['Quicksand'] text-gray-300"
                    prefix="United by creativity, we are"
                  />
                  <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-200 font-['Poppins']">
                    We are a collective of passionate online friends who came together to create, design, build, and innovate. From digital art to websites, from video edits to cosplay gear, we bring ideas to life in the most colorful way possible.
                  </p>
                </div>
            </ElectricBorder>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-20 md:py-32 overflow-hidden">
          <HyperspeedBackground colors={["#89f7fe", "#66a6ff"]} />
          <div className="absolute inset-0 z-10 opacity-30">
            <Ribbons />
          </div>
          <div className="container mx-auto px-6 relative z-20">
            <div className="max-w-4xl mx-auto p-8 md:p-12 bg-black/60 backdrop-blur-md rounded-2xl shadow-2xl shadow-purple-500/20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold font-['Baloo_2'] mb-6">About The Creatorz</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                We are not just a team. We are a group of creative individuals who met online and decided to make something amazing together. Every member of The Creatorz brings their own spark — from digital art to technology, from cosplay to content creation. Our goal is simple: to turn imagination into something you can see, feel, and share.
              </p>
            </div>
          </div>
        </section>

        {/* Member Sections */}
        {membersData.map((member, index) => {
           let backgroundColors: string[];

            if (member.id === 'artists') {
                backgroundColors = ["#0ea5e9", "#ec4899"];
            } else if (member.id === 'developers') {
                backgroundColors = ["#a855f7", "#06b6d4"];
            } else {
                backgroundColors = memberColors[index % memberColors.length];
            }

            // Determine styles based on index (Even/Odd theme)
            const isEven = index % 2 === 0;
            const titleColor = isEven ? "text-cyan-300" : "text-pink-300";
            const contactColor = isEven ? "text-purple-400" : "text-green-400";
            const borderColor = isEven ? "border-cyan-400" : "border-pink-400";

            const CardComponent = (
                <CreatorCard 
                    roleName={member.name}
                    bio={member.bio}
                    profiles={member.profiles}
                    titleColorClass={titleColor}
                    contactColorClass={contactColor}
                    borderColorClass={borderColor}
                />
            );

           return (
            <section id={member.id} key={member.id} className="relative py-20 md:py-24 min-h-screen flex items-center overflow-hidden">
              <HyperspeedBackground colors={backgroundColors} />
              <div className="container mx-auto px-6 relative z-10">
                <SectionHeading text={member.sectionTitle} className="text-4xl md:text-5xl font-bold font-['Baloo_2'] text-center mb-12" />
                <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
                  <div className="w-full lg:flex-[2]">
                    <ClickSpark>
                      <InteractiveGallery 
                        images={member.galleryImages} 
                        onImageSelect={(imgIndex) => openLightbox(member.id, imgIndex)}
                      />
                    </ClickSpark>
                  </div>
                  <div className="w-full lg:flex-[1]">
                    {isEven ? (
                      <Stack>
                        {CardComponent}
                      </Stack>
                    ) : (
                      <ElectricBorder>
                         {CardComponent}
                      </ElectricBorder>
                    )}
                  </div>
                </div>
              </div>
            </section>
        )})}

        {/* Contact Section */}
        <footer id="contact" className="relative py-16 md:py-24 bg-black overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
             <Ribbons />
          </div>
          <div className="relative z-10">
            <div className="container mx-auto px-6 mb-20">
              <SectionHeading text="Get In Touch" className="text-4xl md:text-5xl font-bold font-['Baloo_2'] text-center mb-12" />
              <ContactForm />
            </div>
            
            <InfiniteMenu items={contactLinks} />
             <div className="text-center mt-12 px-6">
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                    We are always open to collaborations, commissions, and new creative adventures. Get in touch and let’s create something amazing together.
                </p>
                <p className="mt-8 text-sm text-gray-500">&copy; {new Date().getFullYear()} The Creatorz. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;