export type WebinarType = 'pilot' | 'cabin-crew';

export interface WebinarData {
  id: WebinarType;
  title: string;
  subtitle: string;

  // ✅ Keep existing (no break)
  host: {
    name: string;
    role: string;
    image: string;
    mentoredCount: string;
  };

  // ✅ ADD THIS (new mentors support)
  mentors?: {
    name: string;
    role: string;
    image: string;
  }[];

  date: string;
  time: string;
  location: string;

  discoveries: {
    title: string;
    description: string;
    icon: string; // Lucide icon name
    color: string;
  }[];

  agenda: {
    time: string;
    title: string;
    points: string[];
  }[];

  faq: {
    question: string;
    answer: string;
  }[];

  targetAudience: {
    title: string;
    description: string;
    icon: string;
  }[];
}