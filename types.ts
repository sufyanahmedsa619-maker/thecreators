export interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}

export interface CreatorProfile {
  contact: string;
  profileImage: string;
}

export interface Member {
  id: string;
  sectionTitle: string;
  name: string;
  bio: string;
  profiles: CreatorProfile[];
  galleryImages: string[];
}
