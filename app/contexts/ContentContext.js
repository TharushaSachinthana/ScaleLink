'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const defaultContent = {
  company: {
    name: 'ScaleLink Technologies',
    tagline: 'Scaling Your Salon to the Next Level',
    heroSubtitle: 'We provide all-in-one technology solutions for salons — from premium websites and mobile apps to POS systems, CRM solutions, and smart review tools. Let us handle the tech while you focus on what you do best.',
    aboutTitle: 'Who We Are',
    aboutText: 'ScaleLink Technologies is a passionate team of innovators dedicated to transforming salon businesses through cutting-edge technology. Based in Marawila, Sri Lanka, we understand the unique challenges that salon owners face in the digital world. Our mission is to bridge the gap between traditional salon services and modern technology, helping businesses scale effortlessly.',
    aboutText2: 'We believe every salon deserves a powerful digital presence. From stunning websites that attract new clients to smart POS systems that streamline operations, we craft solutions that are as beautiful as they are functional. Our vision is to become the leading tech partner for salons across Sri Lanka and beyond.',
    phone: '',
    location: 'Marawila, Sri Lanka',
    facebook: 'https://www.facebook.com/share/1ALpkrRTeb/',
    linkedin: '#',
    tiktok: '#',
    whatsapp: '#',
  },
  pillars: [
    {
      id: 1,
      icon: '🎨',
      title: 'Creative Excellence',
      subtitle: 'Design That Captivates',
      description: 'We craft visually stunning digital experiences that capture your brand essence and leave lasting impressions on your clients.'
    },
    {
      id: 2,
      icon: '⚡',
      title: 'Smart Technology',
      subtitle: 'Systems That Scale',
      description: 'From POS to CRM, our intelligent systems automate your operations, giving you more time to focus on your craft.'
    },
    {
      id: 3,
      icon: '📈',
      title: 'Growth Driven',
      subtitle: 'Results That Matter',
      description: 'Every solution we build is designed with one goal — to help your salon grow, attract more clients, and increase revenue.'
    }
  ],
  services: [
    {
      id: 1,
      icon: '🌐',
      title: 'Premium Websites',
      description: 'Stunning, conversion-focused websites designed specifically for salons. Showcase your services, attract new clients, and build your brand online.'
    },
    {
      id: 2,
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Custom native and cross-platform mobile applications that let your clients book appointments, browse services, and stay connected on the go.'
    },
    {
      id: 3,
      icon: '🖥️',
      title: 'POS Systems',
      description: 'Streamlined point-of-sale solutions tailored for salons. Manage billing, inventory, and transactions with ease and efficiency.'
    },
    {
      id: 4,
      icon: '🔗',
      title: 'CRM Systems',
      description: 'Powerful customer relationship management tools to track client preferences, automate follow-ups, and boost retention rates.'
    },
    {
      id: 5,
      icon: '📣',
      title: 'Social Media Management',
      description: 'End-to-end social media strategies that build your online presence, engage your audience, and turn followers into loyal clients.'
    },
    {
      id: 6,
      icon: '⭐',
      title: 'ScanReview',
      description: 'Our signature QR-code based review system. Customers simply scan a code to leave a review — no links, no hassle. Boost your online reputation effortlessly.'
    }
  ],
  industries: [
    { id: 1, icon: '💇', name: 'Salons & Beauty', active: true },
    { id: 2, icon: '🍽️', name: 'Restaurants', active: false },
    { id: 3, icon: '🏨', name: 'Hotels & Hospitality', active: false },
    { id: 4, icon: '📦', name: 'Export Businesses', active: false },
  ],
  portfolio: [
    {
      id: 1,
      title: 'Elegance Salon',
      category: 'Websites',
      description: 'Premium website for a luxury salon chain',
      image: ''
    },
    {
      id: 2,
      title: 'GlamBook App',
      category: 'Mobile Apps',
      description: 'Appointment booking mobile app',
      image: ''
    },
    {
      id: 3,
      title: 'StylePOS',
      category: 'POS',
      description: 'Complete salon POS system',
      image: ''
    },
    {
      id: 4,
      title: 'BeautyConnect CRM',
      category: 'CRM',
      description: 'Client management platform for salons',
      image: ''
    },
    {
      id: 5,
      title: 'Luxe Hair Studio',
      category: 'Websites',
      description: 'Modern responsive website',
      image: ''
    },
    {
      id: 6,
      title: 'SalonHub',
      category: 'Mobile Apps',
      description: 'Multi-salon management app',
      image: ''
    }
  ],
  testimonials: [
    {
      id: 1,
      quote: 'ScaleLink transformed our salon with a stunning website and smart POS system. Our bookings increased by 40% in just two months!',
      name: 'Sachini Perera',
      title: 'Owner',
      company: 'Elegance Beauty Salon'
    },
    {
      id: 2,
      quote: 'The ScanReview system is genius! Our Google reviews doubled since we started using it. Clients love how easy it is.',
      name: 'Kasun Fernando',
      title: 'Manager',
      company: 'Style Masters Colombo'
    },
    {
      id: 3,
      quote: 'Professional, creative, and always delivering beyond expectations. ScaleLink is the tech partner every salon needs.',
      name: 'Amaya Dissanayake',
      title: 'Founder',
      company: 'Glow Up Studio'
    }
  ]
};

const ContentContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('scalelink_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setContent({ ...defaultContent, ...parsed });
      } catch (e) {
        setContent(defaultContent);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateContent = (section, data) => {
    setContent(prev => {
      const updated = { ...prev, [section]: data };
      localStorage.setItem('scalelink_content', JSON.stringify(updated));
      return updated;
    });
  };

  const resetContent = () => {
    localStorage.removeItem('scalelink_content');
    setContent(defaultContent);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isLoaded }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

export { defaultContent };
