import { WebinarData } from '../types';
import pilot1 from '../assets/pilot1.jpg';
import pilot2 from '../assets/pilot2.jpg';
import crew1 from '../assets/crew1.jpg';
import crew2 from '../assets/crew2.jpg';

export const webinars: Record<string, WebinarData> = {
  pilot: {
    id: 'pilot',
    title: 'How to Become a Commercial Pilot in 2026',
    subtitle: "Join India’s leading pilot mentor, Capt. Manoj Kumar—Founder of AeroMitra Aviation & USA-trained Commercial Pilot—along with Capt. Amritpal, Chief Ground Instructor at AeroMitra Aviation, for a complete roadmap from classroom to cockpit.",

    // ✅ UPDATED HERE
    mentors: [
      {
        name: 'Capt. Manoj Kumar',
        role: 'Founder • USA-trained Commercial Pilot',
        image: pilot1,
      },
      {
        name: 'Capt. Amritpal',
        role: 'Chief Ground Instructor • AeroMitra Aviation',
        image: pilot2,
      },
    ],

    date: '12 April 2026',
    time: '11:00 AM IST',
    location: 'Online Live',

    discoveries: [
  {
    title: "Complete Pilot Roadmap",
    description: "Step-by-step journey from 12th PCM to becoming a Commercial Pilot with complete clarity.",
    icon: "Compass",
    color: "",
  },
  {
    title: "Eligibility & Medicals",
    description: "Understand medical requirements, age criteria, and qualifications required to start your journey.",
    icon: "ShieldCheck",
    color: "",
  },
  {
    title: "Training Structure",
    description: "Detailed breakdown of ground school, flying hours, DGCA exams, and license process.",
    icon: "BookOpen",
    color: "",
  },
  {
    title: "Cost & Investment",
    description: "Clear understanding of total training cost, financing options, and smart investment planning.",
    icon: "IndianRupee",
    color: "",
  },
  {
    title: "Career & Salary Growth",
    description: "Starting salary, airline career path, promotions, and long-term growth opportunities.",
    icon: "TrendingUp",
    color: "",
  },
  {
    title: "Future of Aviation",
    description: "Global demand, new technologies, and future opportunities shaping aviation careers.",
    icon: "Globe",
    color: "",
  }
],

    agenda: [
  {
    time: "11:05 AM",
    title: "Pilot Journey – Step-by-Step Clarity",
    points: [
      "Complete roadmap from beginner to Commercial Pilot License (CPL)",
      "DGCA ground school & exam preparation explained clearly",
      "Flying hours, simulator training & aircraft exposure breakdown",
      "Training structure in India vs abroad (USA, South Africa)"
    ]
  },
  {
    time: "11:20 PM",
    title: "Global Training & Exposure",
    points: [
      "Why many pilots choose international flight training",
      "Benefits of better weather, infrastructure & flying conditions",
      "How global exposure improves skills and job opportunities"
    ]
  },
  {
    time: "11:30 PM",
    title: "Ground School & Training Foundation",
    points: [
      "Importance of strong DGCA subject fundamentals",
      "How ground training directly impacts flying performance",
      "Common mistakes students make during preparation"
    ]
  },
  {
    time: "11:40 PM",
    title: "Training Cost & Planning",
    points: [
      "Real cost breakdown (ground + flying + additional expenses)",
      "Hidden costs students often miss",
      "Smart financial planning before starting your journey"
    ]
  },
  {
    time: "11:50 PM",
    title: "License Conversion Guidance",
    points: [
      "Overview of converting foreign CPL to DGCA",
      "Key steps, documents & process explained",
      "Mistakes that cause delays and extra cost"
    ]
  },
  {
    time: "11:55 PM",
    title: "Live Interaction with Aviation Experts",
    points: [
      "Ask real doubts about training and career path",
      "Get guidance from experienced pilots & instructors",
      "Practical insights based on real aviation industry experience"
    ]
  }
],

    faq: [
      {
        question: "Is this webinar suitable for beginners?",
        answer: "Absolutely. Even if you have zero knowledge about pilot training, this session will simplify everything for you from scratch."
      },
      {
        question: "Will there be a live Q&A session?",
        answer: "Yes! There will be a dedicated live Q&A round where Capt. Deval Soni will directly answer your most pressing doubts."
      },
      {
        question: "How is this different from YouTube videos?",
        answer: "This is a personalized, live session packed with real stories, actionable advice, and insider tips that you won’t find on YouTube. It's interactive and current."
      },
      {
        question: "Will you explain Cadet vs Conventional paths?",
        answer: "Yes. Capt. Deval will explain the pros and cons of both paths so you can decide what’s right for your specific situation."
      },
      {
        question: "Is there a recording available?",
        answer: "Usually, live participation is encouraged to get the most out of the Q&A, but if a recording is available, details will be shared at the end of the session."
      }
    ],

    targetAudience: [
  {
    title: "Students (12th PCM)",
    description: "Confused about whether becoming a pilot is the right career after school.",
    icon: "GraduationCap",
  },
  {
    title: "Graduates",
    description: "Looking to switch careers or start fresh in the aviation industry.",
    icon: "Briefcase",
  },
  {
    title: "Parents",
    description: "Concerned about training costs, safety, and long-term career stability.",
    icon: "Users",
  },
]
  },

  'cabin-crew': {
    id: 'cabin-crew',
    title: 'How to Build a Career in Cabin Crew, Ground Staff.',
    subtitle: "Join aviation experts Divya Anand, Aviation Career Mentor and Subject Matter Expert, along with Artika Arora, former cabin crew at SpiceJet and now an Aviation Trainer, for a complete roadmap from training to real-world aviation opportunities.",

    // ✅ UPDATED HERE
    mentors: [
      {
        name: 'Ms.Divya Anand',
        role: 'Aviation Career Mentor',
        image: crew1,
      },
      {
        name: 'Ms. Artika Arora ',
        role: 'former cabin crew at SpiceJet and now an Aviation Trainer',
        image: crew2,
      },
    ],

    date: '11th April 2026',
    time: '11:00 AM IST',
    location: 'Online Live',

    discoveries: [
      {
        title: "Grooming & Etiquette",
        description: "Learn the international standards of grooming and professional etiquette required by top airlines.",
        icon: 'Sparkles',
        color: "bg-pink-500",
      },
      {
        title: "Interview Mastery",
        description: "Master the art of answering complex situational questions and group discussions.",
        icon: 'Mic2',
        color: "bg-purple-500",
      },
      {
        title: "Safety & Service",
        description: "Get an insider look at the rigorous safety training and world-class service standards.",
        icon: 'ShieldCheck',
        color: "bg-indigo-500",
      },
      {
        title: "Salary & Lifestyle",
        description: "Understand the compensation structure, layovers, and the global lifestyle of a flight attendant.",
        icon: 'Globe',
        color: "bg-cyan-500",
      },
    ],

    agenda: [
      {
        time: "11:05 AM",
        title: "Eligibility & Physical Requirements",
        points: [
          "Height, weight, and BMI standards for domestic vs international",
          "Age limits and educational qualifications",
          "Medical fitness and tattoo policies",
          "Language proficiency requirements"
        ]
      },
      {
        time: "11:25 AM",
        title: "The 5-Step Selection Process",
        points: [
          "CV shortlisting secrets",
          "Group Discussion (GD) elimination rounds",
          "Personal Interview & Grooming check",
          "Final documentation and background verification"
        ]
      },
      {
        time: "11:40 PM",
        title: "Training & Career Growth",
        points: [
          "What happens during the 3-month training period",
          "Safety, First Aid, and Emergency procedures",
          "Promotion paths: From Crew to Purser to Trainer",
          "Transitioning to ground roles later in career"
        ]
      },
      {
        time: "11:55 PM",
        title: "Live Mock Interview & Q&A",
        points: [
          "Live demonstration of a group discussion",
          "Common interview mistakes to avoid",
          "Direct Q&A with Ms. Shweta Sharma"
        ]
      }
    ],

    faq: [
      {
        question: "Do I need a degree to become a Cabin Crew?",
        answer: "Most airlines require a minimum of 10+2 (High School) completion. While a degree is not mandatory, it can be an advantage for international carriers."
      },
      {
        question: "Is there a height requirement?",
        answer: "Yes, most airlines have a minimum reach requirement (usually 212cm on tiptoes) or a minimum height (155cm-160cm for females, 170cm-175cm for males)."
      },
      {
        question: "Can I apply if I have spectacles?",
        answer: "Yes, as long as your vision is correctable to 6/6 with contact lenses. Most airlines allow spectacles for ground staff but prefer lenses for crew."
      },
      {
        question: "What is the starting salary?",
        answer: "Domestic crew in India earn between ₹35,000 to ₹50,000, while international crew can earn between ₹80,000 to ₹1.5 Lakhs including flying allowances."
      }
    ],

    targetAudience: [
      {
        title: "12th Pass Students",
        description: "Young aspirants looking for a dynamic career right after school.",
        icon: 'GraduationCap',
      },
      {
        title: "Hospitality Professionals",
        description: "Those in hotels or travel looking to transition to the skies.",
        icon: 'UserCheck',
      },
      {
        title: "Final Year Students",
        description: "Graduates looking for an international lifestyle and high growth.",
        icon: 'Briefcase',
      },
    ]
  }
};