import { Member, NavLink } from './types';

// Profile images are referenced directly from the public root.
// Ensure these files exist in your public/images/profiles/ folder.
const artistoneProfile = '/images/profiles/artists1.jpg';
const artisttwoProfile = '/images/profiles/artists2.jpg';
const artistthreeProfile = '/images/profiles/artists3.jpg';
const artistfourProfile = '/images/profiles/artists4.jpg';
const artistfiveProfile = '/images/profiles/artists5.jpg';

const moderatorProfile = '/images/profiles/moderators.jpg';

export const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  {
    href: '#artists', // Parent href defaults to the first child
    label: 'Talent',
    children: [
      { href: '#artists', label: 'Artists' },
      { href: '#developers', label: 'Developers' },
      { href: '#designers', label: 'Designers' },
      { href: '#editors', label: 'Editors' },
      { href: '#cosplay', label: 'Cosplay' },
      { href: '#moderators', label: 'Moderators' },
      { href: '#furry', label: 'Furry' },
    ],
  },
  { href: '#contact', label: 'Contact' },
];

// MANUAL IMAGE LISTS (STABLE FIX)
// These lists replace the dynamic imports that were breaking the build on some devices.
const galleries = {
  artists: [
    '/images/artists/1.jpg', '/images/artists/2.jpg', '/images/artists/3.jpg',
    '/images/artists/7.jpg', '/images/artists/8.jpg', '/images/artists/9.jpg',
    '/images/artists/10.jpg', '/images/artists/11.jpg', '/images/artists/13.jpg',
    '/images/artists/14.jpg', '/images/artists/15.jpg', '/images/artists/16.jpg',
    '/images/artists/17.jpg', '/images/artists/19.jpg', '/images/artists/20.jpg',
    '/images/artists/24.jpg', '/images/artists/25.jpg'
  ],
  developers: [
    '/images/developers/1.jpg', '/images/developers/2.jpg', '/images/developers/3.jpg',
    '/images/developers/4.jpg', '/images/developers/5.jpg', '/images/developers/6.jpg',
    '/images/developers/7.jpg', '/images/developers/8.jpg', '/images/developers/9.jpg',
    '/images/developers/10.jpg'
  ],
  designers: [
    '/images/designers/1.jpg', '/images/designers/2.jpg', '/images/designers/3.jpg',
    '/images/designers/4.jpg', '/images/designers/5.jpg', '/images/designers/6.jpg',
    '/images/designers/7.jpg', '/images/designers/8.jpg'
  ],
  editors: [
    '/images/editors/1.jpg', '/images/editors/2.jpg', '/images/editors/3.jpg',
    '/images/editors/4.jpg', '/images/editors/5.jpg', '/images/editors/6.jpg',
    '/images/editors/7.jpg', '/images/editors/8.jpg', '/images/editors/9.jpg',
    '/images/editors/10.jpg'
  ],
  cosplay: [
    '/images/cosplay/1.jpg', '/images/cosplay/2.jpg', '/images/cosplay/3.jpg',
    '/images/cosplay/4.jpg', '/images/cosplay/5.jpg'
  ],
  moderators: [
    '/images/moderators/1.jpg', '/images/moderators/2.jpg', '/images/moderators/3.jpg',
    '/images/moderators/4.jpg', '/images/moderators/5.jpg', '/images/moderators/6.jpg',
    '/images/moderators/7.jpg', '/images/moderators/8.jpg', '/images/moderators/9.jpg',
    '/images/moderators/10.jpg'
  ],
  furry: [
    '/images/furry/1.jpg', '/images/furry/2.jpg', '/images/furry/3.jpg',
    '/images/furry/4.jpg', '/images/furry/5.jpg', '/images/furry/6.jpg',
    '/images/furry/7.jpg', '/images/furry/8.jpg', '/images/furry/9.jpg',
    '/images/furry/11.jpg', '/images/furry/12.jpg', '/images/furry/13.jpg',
    '/images/furry/14.jpg', '/images/furry/15.jpg', '/images/furry/16.jpg',
    '/images/furry/17.jpg', '/images/furry/18.jpg', '/images/furry/19.jpg'
  ],
};

export const membersData: Member[] = [
  {
    id: 'artists',
    sectionTitle: 'The Visionary Artist',
    name: 'Digital & Hand Drawing Artist',
    bio: 'A passionate artist who brings imagination to life through 2D illustrations, character art, furry designs, banners, and custom digital work. Anything you dream, they can draw.',
    profiles: [
        { contact: 'Discord: @carlacruz2002', profileImage: artistoneProfile },
        { contact: 'Discord: @gaia_here', profileImage: artisttwoProfile },
        { contact: 'Discord: @alessia_her', profileImage: artistthreeProfile },
        { contact: 'Discord: @vayra_her', profileImage: artistfourProfile },
        { contact: 'Discord: @vixara_here', profileImage: artistfiveProfile }
	],
    galleryImages: galleries.artists,
  },
  {
    id: 'developers',
    sectionTitle: 'The Web Wizard',
    name: 'Web Developer',
    bio: 'A coding expert who creates websites of all kinds — from simple portfolios to complex online stores. Clean design, smooth function, and performance-focused builds every time.',
    profiles: [
        { contact: 'Discord: @vixara_here', profileImage: artistfiveProfile }
    ],
    galleryImages: galleries.developers,
  },
  {
    id: 'designers',
    sectionTitle: 'The Thumbnail Designer',
    name: 'Thumbnail Designer',
    bio: 'Crafts eye-catching thumbnails for YouTube and other platforms. Each design is tailored to grab attention and boost engagement.',
    profiles: [
        { contact: 'Discord: @vayra_her', profileImage: artistfourProfile }
    ],
    galleryImages: galleries.designers,
  },
  {
    id: 'editors',
    sectionTitle: 'The Video Editor',
    name: 'Video Editor',
    bio: 'Skilled in editing content for YouTube, TikTok, and Instagram. Delivers smooth cuts, dynamic transitions, and impactful storytelling.',
    profiles: [
        { contact: 'Discord: @alessia_her', profileImage: artistthreeProfile }
    ],
    galleryImages: galleries.editors,
  },
  {
    id: 'cosplay',
    sectionTitle: 'The Cosplay Crafter',
    name: 'Cosplay Equipment Provider',
    bio: 'Supplies a wide range of cosplay equipment and accessories. From swords to armor to wigs, providing quality materials for creators and performers.',
    profiles: [
        { contact: 'Discord: @carlacruz2002', profileImage: artistoneProfile }
    ],
    galleryImages: galleries.cosplay,
  },
  {
    id: 'moderators',
    sectionTitle: 'The Server Moderator',
    name: 'Discord Moderator',
    bio: 'A skilled community moderator experienced in managing large Discord servers. Keeps spaces safe, organized, and welcoming.',
    profiles: [
        { contact: 'Discord: @ramiro_here', profileImage: moderatorProfile }
    ],
    galleryImages: galleries.moderators,
  },
  {
    id: 'furry',
    sectionTitle: 'The Furry Specialist',
    name: 'Furry Content Creator',
    bio: 'Your go-to person for everything furry. Deals in fursuits, furry-themed bedsheets, decor, and more.',
    profiles: [
        { contact: 'Discord: @vayra_her', profileImage: artistfourProfile }
    ],
    galleryImages: galleries.furry,
  },
];

export const contactLinks = [
    "Join our Discord", "Collaborate with us", "Follow The Creatorz", "Get in touch", "Work with us"
];
