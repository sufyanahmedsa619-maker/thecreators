import React, { useState, useEffect, useRef, useMemo } from 'react';

// Define the NavLink structure
interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}

interface PillNavProps {
  links: NavLink[];
}

// Helper to flatten links for the IntersectionObserver
const getAllLinks = (links: NavLink[]): { href: string; parent?: string }[] => {
  const all: { href: string; parent?: string }[] = [];
  for (const link of links) {
    if (link.children) {
      for (const child of link.children) {
        all.push({ href: child.href, parent: link.label });
      }
    } else {
      all.push({ href: link.href });
    }
  }
  return all;
};

const PillNav: React.FC<PillNavProps> = ({ links }) => {
  const [activeLink, setActiveLink] = useState(links[0]?.href || '#');
  const [activeParent, setActiveParent] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState<{ top: number; left: number; width: number } | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const talentLinkRef = useRef<HTMLLIElement | null>(null);
  const navUlRef = useRef<HTMLUListElement>(null);
  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef<number | undefined>(undefined);

  const flatLinks = useMemo(() => getAllLinks(links), [links]);

  // Intersection Observer to set active link
  useEffect(() => {
    const sections = flatLinks
      .map(link => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        const intersectingEntry = entries.find(entry => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveLink(`#${intersectingEntry.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [flatLinks]);

  // Effect to set active parent based on active link
  useEffect(() => {
    const currentLink = flatLinks.find(l => l.href === activeLink);
    setActiveParent(currentLink?.parent || null);
  }, [activeLink, flatLinks]);
  
  // Effect to position the dropdown
  useEffect(() => {
    const talentEl = talentLinkRef.current;
    const wrapperEl = wrapperRef.current;
    if (openDropdown && talentEl && wrapperEl) {
      const talentRect = talentEl.getBoundingClientRect();
      const wrapperRect = wrapperEl.getBoundingClientRect();

      setDropdownCoords({
        top: talentRect.bottom - wrapperRect.top,
        left: talentRect.left - wrapperRect.left,
        width: talentRect.width,
      });
    }
  }, [openDropdown]);


  // Effect to handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect to check if the nav list is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      const ul = navUlRef.current;
      if (ul) {
        // A small buffer is added to prevent the fade from showing up on minor pixel overflows
        const hasOverflow = ul.scrollWidth > ul.clientWidth + 2;
        setIsScrollable(hasOverflow);
      }
    };
    
    // Check after a short delay to allow for rendering and font loading
    const timeoutId = setTimeout(checkScrollable, 100);

    const resizeObserver = new ResizeObserver(checkScrollable);
    if (navUlRef.current) {
        resizeObserver.observe(navUlRef.current);
    }
    
    return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
    };
  }, [links]);


  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      isClickScrolling.current = true;
      setActiveLink(href);
      setOpenDropdown(null); // Close dropdown on any link click

      targetElement.scrollIntoView({ behavior: 'smooth' });

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = window.setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    }
  };
  
  const handleParentLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents the outside click handler from closing it immediately
    setOpenDropdown(prev => (prev === label ? null : label));
  };
  
  const talentSubLinks = links.find(l => l.children)?.children || [];

  return (
    <>
      <div ref={wrapperRef} className="relative">
        <nav className="relative bg-black/50 backdrop-blur-lg rounded-full shadow-lg shadow-purple-500/20 max-w-[95vw] p-1.5">
          
          {/* Overlays for scroll indication */}
          <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${isScrollable ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10 transition-opacity duration-300 ${isScrollable ? 'opacity-100' : 'opacity-0'}`}></div>

          <ul ref={navUlRef} className="flex items-center justify-start gap-1 overflow-x-auto">
            {links.map((link) => (
              <li 
                key={link.href}
                className="relative"
                ref={link.children ? (el) => { talentLinkRef.current = el; } : null}
              >
                <a
                  href={link.href}
                  onClick={(e) => link.children ? handleParentLinkClick(e, link.label) : handleLinkClick(e, link.href)}
                  className={`pill-link relative flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full overflow-hidden whitespace-nowrap
                    ${(activeLink === link.href || activeParent === link.label) ? 'is-active text-white' : 'text-gray-400'}`}
                >
                  <span className="label-stack relative inline-block overflow-hidden">
                    <span className="label-default block transition-transform duration-300 ease-in-out">{link.label}</span>
                    <span className="label-hover block absolute top-0 left-0 w-full text-white transition-transform duration-300 ease-in-out translate-y-full">{link.label}</span>
                  </span>
                  <span className="hover-circle absolute z-[-1] bottom-0 left-1/2 w-40 h-40 bg-pink-600 rounded-full transition-transform duration-400 ease-in-out -translate-x-1/2 translate-y-full scale-0"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* RENDER DROPDOWN OUTSIDE of the clipping container */}
        {openDropdown && dropdownCoords && (
          <ul
            style={{
              position: 'absolute',
              top: `${dropdownCoords.top + 8}px`,
              left: `${dropdownCoords.left + dropdownCoords.width / 2}px`,
              transform: 'translateX(-50%)',
            }}
            className="w-48 bg-black/70 backdrop-blur-lg rounded-xl shadow-xl p-2 z-20"
          >
            {talentSubLinks.map(child => (
              <li key={child.href}>
                <a
                  href={child.href}
                  onClick={(e) => handleLinkClick(e, child.href)}
                  className={`block px-4 py-2 text-sm rounded-md ${activeLink === child.href ? 'bg-pink-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
                >
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        /* Hide scrollbar */
        nav ul::-webkit-scrollbar {
            display: none;
        }
        nav ul {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        
        /* Pill-link animation styles */
        .pill-link:hover .label-default,
        .pill-link.is-active .label-default {
          transform: translateY(-100%);
        }
        .pill-link:hover .label-hover,
        .pill-link.is-active .label-hover {
          transform: translateY(0);
        }
        .pill-link:hover .hover-circle,
        .pill-link.is-active .hover-circle {
          transform: translateX(-50%) translateY(50%) scale(1.2);
        }
      `}</style>
    </>
  );
};

export default PillNav;