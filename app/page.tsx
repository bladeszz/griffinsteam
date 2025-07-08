"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { ChevronDown, Mail, Phone, MapPin, Trophy, Users, Star, ShoppingBag, Target, Award, Zap } from 'lucide-react';

const EsportWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Find which section is currently visible
      const sections = ['home', 'players', 'sponsors', 'contact', 'merch'];
      let currentSection = 'home';
      
      // Determine which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = 
            // For the home section, check if it's at the top
            (sectionId === 'home' && window.scrollY < 300) ||
            // For other sections, check if they're in the viewport
            (rect.top <= 300 && rect.bottom >= 300);
            
          if (isVisible) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      // Update the active section if it has changed
      setActiveSection(currentSection);
    };
    
    // Use throttled version of the scroll handler to improve performance
    let timeoutId: NodeJS.Timeout | null = null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100); // 100ms throttle
      }
    };
    
    // Run once on mount to set initial active section
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []); // No dependencies to prevent re-creation

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = sectionId === 'players' ? -100 : 0; // 100px offset for players section
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const players = [
    { name: 'CEVDET ÇALIKÇI', nickname: 'Charybd1s', role: 'AWPer', rank: 'Global Elite', image: '/cevdet.png', instagram: 'https://www.instagram.com/cevdetclkc/' },
    { name: 'MUAMMER ATÇEKEN', nickname: 'BladeZ', role: 'Entry Fragger', rank: 'Global Elite', image: '/muammer.png', instagram: 'https://www.instagram.com/nocontxtmua/' },
    { name: 'SAVAŞ ERSÖZ', nickname: 'khanovire', role: 'IGL', rank: 'Global Elite', image: '/savaş.png', instagram: 'https://www.instagram.com/savasersoz_/' },
    { name: 'EMRE ODACI', nickname: 'napanya', role: 'Rifler', rank: 'Global Elite', image: '/emre.png', instagram: 'https://www.instagram.com/emreodaciii/' },
    { name: 'SALİM DEMİR', nickname: 'Pluviophile', role: 'Support', rank: 'Global Elite', image: '/salim.png', instagram: 'https://www.instagram.com/salim_demr/' }
  ];

  const achievements = [
    { title: 'Gamepark Internet Cafe Tournament', year: '2020', place: '3rd' }
  ];

  // Precomputed array of particle positions and sizes
  const particles = [
    { cx: 698.36, cy: 839.40, r: 17.54 },
    { cx: 1074.18, cy: 906.78, r: 9.40 },
    { cx: 13.86, cy: 394.30, r: 22.95 },
    { cx: 772.96, cy: 339.18, r: 17.91 },
    { cx: 783.96, cy: 578.81, r: 12.28 },
    { cx: 420.20, cy: 96.93, r: 11.91 },
    { cx: 578.48, cy: 803.17, r: 21.26 },
    { cx: 1684.12, cy: 905.74, r: 22.90 },
    { cx: 1403.20, cy: 744.64, r: 21.52 },
    { cx: 801.83, cy: 138.29, r: 24.08 },
    { cx: 1439.60, cy: 1063.18, r: 18.09 },
    { cx: 1490.22, cy: 237.41, r: 10.75 },
    { cx: 1139.87, cy: 782.10, r: 22.92 },
    { cx: 1350.46, cy: 1022.41, r: 21.74 },
    { cx: 191.39, cy: 778.28, r: 11.49 },
    { cx: 738.67, cy: 102.38, r: 21.83 },
    { cx: 1592.70, cy: 255.01, r: 10.62 },
    { cx: 194.40, cy: 116.94, r: 15.00 }
  ];

  return (
    <>
      <Head>
        <title>Griffins Esports</title>
      </Head>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-transparent'}`} style={{ minHeight: '8rem' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-32">
              <div className="flex items-center">
                <img 
                  src="/griffinslogo.png" 
                  alt="GRIFFINS Logo" 
                  className="w-24 h-24 rounded-lg bg-gray-900"
                />
                <span className="ml-6 text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                  GRIFFINS
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-16 flex items-center space-x-12">
                  {['home', 'players', 'sponsors', 'contact', 'merch'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`px-6 py-3 rounded-xl text-xl font-bold transition-colors duration-200 shadow-md border-2 border-transparent hover:border-green-400 ${
                        activeSection === item
                          ? 'text-green-400 bg-purple-500/30 border-green-400'
                          : 'text-gray-200 hover:text-green-400 hover:bg-gray-700/70'
                      }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-green-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-green-500/10"></div>
          
          {/* Pençe Arka Planı */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Neon Yeşil Çizgi */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-[500px] bg-gradient-to-b from-transparent via-green-400 to-transparent shadow-2xl shadow-green-400/80 animate-pulse"></div>
              </div>
              {/* Pençe Görseli */}
              <div className="relative z-10 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Image 
                  src="/pençe.png" 
                  alt="Claw Background" 
                  width={600}
                  height={600}
                  className="object-contain filter drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(34, 197, 94, 0.9)) drop-shadow(0 0 80px rgba(34, 197, 94, 0.6))'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 home-section-overlay">
            <div className="mb-8">
              <div className="w-48 h-48 mx-auto mb-8 shadow-2xl rounded-full overflow-hidden bg-gradient-to-r from-purple-500 to-green-400 p-2">
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                  <img 
                    src="/griffinslogo.png" 
                    alt="GRIFFINS Logo" 
                    className="w-40 h-40 object-contain rounded-full" 
                    style={{ background: 'transparent' }}
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-green-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              GRIFFINS
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Amateur Counter-Strike: Global Offensive Team
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center gap-2 text-green-400">
                <Trophy className="w-5 h-5" />
                <span>Regional Champions 2024</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Target className="w-5 h-5" />
                <span>Global Elite Team</span>
              </div>
            </div>
            
            <button
              onClick={() => scrollToSection('players')}
              className="bg-gradient-to-r from-purple-500 to-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Meet Our Team
            </button>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-green-400" />
          </div>
        </section>

        {/* Players Section */}
        <section id="players" className="py-20 bg-gray-800/50 relative overflow-hidden">
          {/* CSGO Arka Planı */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Neon Yeşil Çizgi */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-[500px] bg-gradient-to-b from-transparent via-green-400 to-transparent shadow-2xl shadow-green-400/80 animate-pulse"></div>
              </div>
              {/* CSGO Görseli */}
              <div className="relative z-10 opacity-50 hover:opacity-80 transition-opacity duration-300">
                <Image 
                  src="/csgo.png" 
                  alt="CSGO Background" 
                  width={900}
                  height={900}
                  className="object-contain filter drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 0 50px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 100px rgba(34, 197, 94, 0.5))'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                Our Players
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Meet the skilled professionals who dominate the battlefield
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {players.map((player, index) => (
                <div key={index} className="bg-gray-900/80 rounded-xl p-6 text-center hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 border border-purple-500/20 hover:border-green-400/50">
                  <a 
                    href={player.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block relative group"
                  >
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 relative overflow-hidden border-2 border-purple-500/30 group-hover:border-green-400 transition-all duration-300">
                      <Image 
                        src={player.image} 
                        alt={player.name}
                        width={96}
                        height={96}
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                  <h3 className="text-xl font-bold text-green-400 mb-2">{player.nickname}</h3>
                  <p className="text-gray-300 mb-2">{player.name}</p>
                  <p className="text-sm text-purple-400 mb-2">{player.role}</p>
                  <p className="text-xs text-gray-500">{player.rank}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-8 text-green-400">Recent Achievements</h3>
              <div className="flex justify-center">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gray-900/60 rounded-lg p-6 border border-purple-500/20 hover:border-green-400/30 transition-all duration-300 w-full max-w-md">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-gray-900" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{achievement.title}</h4>
                    <p className="text-purple-400 mb-1">{achievement.year}</p>
                    <p className="text-2xl font-bold text-green-400">{achievement.place}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                Our Sponsors
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Powered by industry leaders who believe in our vision
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-800/60 rounded-xl p-12 text-center hover:bg-gray-800 transition-all duration-300 border border-purple-500/20 hover:border-green-400/50">
                <img src="/audi.png" alt="Audi Logo" className="w-32 h-32 object-contain mx-auto mb-6 rounded-lg shadow-lg" />
                <h3 className="text-2xl font-bold text-green-400 mb-4">Audi</h3>
                <p className="text-gray-300">Premium automotive partner providing excellence in performance and innovation</p>
              </div>
              
              <div className="bg-gray-800/60 rounded-xl p-12 text-center hover:bg-gray-800 transition-all duration-300 border border-purple-500/20 hover:border-green-400/50">
                <img src="/reedbull.png" alt="Red Bull Logo" className="w-32 h-32 object-contain mx-auto mb-6 rounded-lg shadow-lg" />
                <h3 className="text-2xl font-bold text-green-400 mb-4">Red Bull</h3>
                <p className="text-gray-300">Energy drink partner fueling our competitive spirit and peak performance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-800/50 relative overflow-hidden">
          {/* Pençe2 Arka Planı */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Neon Yeşil Çizgi */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-[500px] bg-gradient-to-b from-transparent via-green-400 to-transparent shadow-2xl shadow-green-400/80 animate-pulse"></div>
              </div>
              {/* Pençe2 Görseli */}
              <div className="relative z-10 opacity-60 hover:opacity-90 transition-opacity duration-300">
                <Image 
                  src="/pençe2.png" 
                  alt="Claw Background 2" 
                  width={650}
                  height={650}
                  className="object-contain filter drop-shadow-lg"
                  style={{
                    filter: 'drop-shadow(0 0 45px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 90px rgba(34, 197, 94, 0.5))'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to work with us? Contact our team for partnerships, sponsorships, or collaborations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900/60 rounded-xl p-8 text-center hover:bg-gray-900 transition-all duration-300 border border-purple-500/20">
                <Mail className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300">team@griffinsquad.com</p>
              </div>
              
              <div className="bg-gray-900/60 rounded-xl p-8 text-center hover:bg-gray-900 transition-all duration-300 border border-purple-500/20">
                <Phone className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300">+90 XXX XXX XX XX</p>
              </div>
              
              <div className="bg-gray-900/60 rounded-xl p-8 text-center hover:bg-gray-900 transition-all duration-300 border border-purple-500/20">
                <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                <p className="text-gray-300">Konya, Turkey</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Merch Section */}
        <section id="merch" className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                Team Merchandise
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Show your support with exclusive team gear and apparel
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Forma */}
              <div className="bg-gray-800/60 rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-purple-500/20 hover:border-green-400/50 group">
                <div
                  className="w-48 h-48 mx-auto mb-6 shadow-lg rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(to right, #a21caf, #22d3ee)' }}
                >
                  <img
                    src="/forma.png"
                    alt="Team Jersey"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-150 cursor-zoom-in bg-transparent"
                    style={{ cursor: 'zoom-in', background: 'transparent' }}
                    onClick={() => setZoomedImg('/forma.png')}
                  />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Official Team Jersey</h3>
                <p className="text-gray-300 mb-4">Premium quality jersey with GRIFFINS branding</p>
                <p className="text-2xl font-bold text-purple-400">₺31</p>
              </div>
              {/* Suluk */}
              <div className="bg-gray-800/60 rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-purple-500/20 hover:border-green-400/50 group">
                <div
                  className="w-48 h-48 mx-auto mb-6 shadow-lg rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(to right, #a21caf, #22d3ee)' }}
                >
                  <img
                    src="/suluk.png"
                    alt="Water Bottle"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-150 cursor-zoom-in bg-transparent"
                    style={{ cursor: 'zoom-in', background: 'transparent' }}
                    onClick={() => setZoomedImg('/suluk.png')}
                  />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">GRIFFINS Water Bottle</h3>
                <p className="text-gray-300 mb-4">High-quality stainless steel water bottle</p>
                <p className="text-2xl font-bold text-purple-400">₺31</p>
              </div>
              {/* Şapka */}
              <div className="bg-gray-800/60 rounded-xl p-8 text-center hover:bg-gray-800 transition-all duration-300 border border-purple-500/20 hover:border-green-400/50 group">
                <div
                  className="w-48 h-48 mx-auto mb-6 shadow-lg rounded-xl overflow-hidden flex items-center justify-center"
                  style={{ background: 'linear-gradient(to right, #a21caf, #22d3ee)' }}
                >
                  <img
                    src="/sapka.png"
                    alt="Team Cap"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-150 cursor-zoom-in bg-transparent"
                    style={{ cursor: 'zoom-in', background: 'transparent' }}
                    onClick={() => setZoomedImg('/sapka.png')}
                  />
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">GRIFFINS Team Cap</h3>
                <p className="text-gray-300 mb-4">Stylish cap with embroidered team logo</p>
                <p className="text-2xl font-bold text-purple-400">₺31</p>
              </div>
            </div>
            {/* Zoom Modal */}
            {zoomedImg && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all"
                onClick={() => setZoomedImg(null)}
              >
                <img
                  src={zoomedImg}
                  alt="Zoomed Product"
                  className="max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl border-4 border-green-400 animate-zoom"
                  style={{ objectFit: 'contain', background: 'white' }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-green-400 p-0.5">
                  <div className="w-full h-full bg-gray-900 rounded-md flex items-center justify-center">
                    <img src="/griffinslogo.png" alt="GRIFFINS Logo" className="w-8 h-8 object-contain" />
                  </div>
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                  GRIFFINS
                </span>
              </div>
              <p className="text-gray-400 mb-4">Amateur Counter-Strike: Global Offensive Team</p>
              <p className="text-gray-500 text-sm">© 2025 GRIFFINS Esports. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default EsportWebsite;