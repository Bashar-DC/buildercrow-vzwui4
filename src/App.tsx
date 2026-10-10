import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Check,
  ShieldCheck,
  Flame,
  Sparkles,
  Sliders,
  ChevronRight,
  Eye,
  RefreshCw,
  Car,
  Star,
  Phone,
  Mail,
  Award,
  ArrowRight,
  X,
  Volume2,
  VolumeX,
  Info,
  ShoppingBag,
  Send,
  Zap,
  CheckCircle2,
  Layers,
  Search,
  Filter,
  Maximize2
} from 'lucide-react';

// --- DATA STRUCTURES & SAMPLE DATA ---

interface CarBuild {
  id: string;
  carName: string;
  brand: 'BMW' | 'Porsche' | 'Audi' | 'Mercedes' | 'Corvette' | 'Nissan' | 'Lamborghini';
  tagline: string;
  price: number;
  specs: {
    material: string;
    grip: string;
    stitching: string;
    ledDisplay: boolean;
    paddleShifters: string;
    topStripe: string;
  };
  image: string;
  videoUrl: string;
  featured?: boolean;
}

const CAR_MODELS = [
  { id: 'bmw-m3-m4', brand: 'BMW', name: 'BMW M3 / M4 (G80/G82/G83)' },
  { id: 'bmw-m5', brand: 'BMW', name: 'BMW M5 / F90 Competition' },
  { id: 'porsche-911', brand: 'Porsche', name: 'Porsche 911 GT3 / Turbo S (992)' },
  { id: 'porsche-718', brand: 'Porsche', name: 'Porsche 718 Cayman GT4 RS' },
  { id: 'audi-rs6', brand: 'Audi', name: 'Audi RS6 Avant / RS7 (C8)' },
  { id: 'audi-r8', brand: 'Audi', name: 'Audi R8 V10 Performance' },
  { id: 'amg-c63', brand: 'Mercedes', name: 'Mercedes-AMG C63s / E63s' },
  { id: 'amg-gtr', brand: 'Mercedes', name: 'Mercedes-AMG GT R / Pro' },
  { id: 'corvette-c8', brand: 'Corvette', name: 'Chevrolet Corvette C8 Z06' },
  { id: 'nissan-gtr', brand: 'Nissan', name: 'Nissan GT-R R35 Nismo' },
  { id: 'lambo-huracan', brand: 'Lamborghini', name: 'Lamborghini Huracán EVO / STO' },
];

const CUSTOM_BUILDS: CarBuild[] = [
  {
    id: 'build-1',
    carName: 'BMW M4 Competition (G82)',
    brand: 'BMW',
    tagline: 'Track-Ready Matte Forged Carbon with LED Rev Indicator',
    price: 1850,
    specs: {
      material: 'Matte Forged Carbon Fiber',
      grip: 'Perforated Italian Leather',
      stitching: 'Tri-Color M Stitching',
      ledDisplay: true,
      paddleShifters: 'Extended Forged Carbon',
      topStripe: 'M-Stripes (Blue/Purple/Red)'
    },
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-steering-wheel-close-up-42861-large.mp4',
    featured: true
  },
  {
    id: 'build-2',
    carName: 'Porsche 911 GT3 RS (992)',
    brand: 'Porsche',
    tagline: 'Ultra-light Gloss 3K Twill Carbon & Race Alcantara',
    price: 2100,
    specs: {
      material: '2x2 Gloss Twill Carbon',
      grip: 'Full Race Alcantara',
      stitching: 'Lizard Green Stitching',
      ledDisplay: true,
      paddleShifters: 'Billet Magnetic Paddles',
      topStripe: 'Lizard Green 12 O\'Clock Ring'
    },
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sport-car-driving-fast-at-night-42862-large.mp4',
    featured: true
  },
  {
    id: 'build-3',
    carName: 'Audi RS6 Avant (C8)',
    brand: 'Audi',
    tagline: 'Honeycomb Carbon Fiber with Racing Flat-Bottom Shape',
    price: 1750,
    specs: {
      material: 'Red Weave Honeycomb Carbon',
      grip: 'Smooth Nappa Leather',
      stitching: 'Crimson Red Stitching',
      ledDisplay: false,
      paddleShifters: 'Audi Sport Red Carbon Paddles',
      topStripe: 'Crimson Red Stripe'
    },
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-steering-wheel-while-driving-41584-large.mp4'
  },
  {
    id: 'build-4',
    carName: 'Mercedes-AMG GT R',
    brand: 'Mercedes',
    tagline: 'F1-Inspired Yoke Carbon Wheel with Dynamic RPM Shift Lights',
    price: 2350,
    specs: {
      material: 'High-Gloss 2x2 Carbon Fiber',
      grip: 'Perforated Alcantara Hybrid',
      stitching: 'Solarbeam Yellow',
      ledDisplay: true,
      paddleShifters: 'Extra-Long AMG Paddles',
      topStripe: 'Yellow 12 O\'Clock Stripe'
    },
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dashboard-of-a-car-driving-at-night-42863-large.mp4',
    featured: true
  },
  {
    id: 'build-5',
    carName: 'Chevrolet Corvette C8 Z06',
    brand: 'Corvette',
    tagline: 'Squared-Off Carbon Wheel with Custom Carbon Button Trims',
    price: 1650,
    specs: {
      material: 'Forged Carbon Fiber',
      grip: 'Nappa Leather',
      stitching: 'Velocity Yellow',
      ledDisplay: true,
      paddleShifters: 'Forged Carbon Paddles',
      topStripe: 'Yellow 12 O\'Clock Stripe'
    },
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-steering-wheel-close-up-42861-large.mp4'
  },
  {
    id: 'build-6',
    carName: 'Nissan GT-R R35 Nismo',
    brand: 'Nissan',
    tagline: 'Aggressive Ergonomic Grips & Red Carbon Highlights',
    price: 1590,
    specs: {
      material: 'Gloss 3K Carbon Fiber',
      grip: 'Full Black Alcantara',
      stitching: 'Nismo Red',
      ledDisplay: true,
      paddleShifters: 'Fixed Column-Mounted Carbon',
      topStripe: 'Nismo Red 12 O\'Clock Stripe'
    },
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-steering-wheel-while-driving-41584-large.mp4'
  }
];

const VIDEO_SAMPLE_COLLECTION = [
  {
    id: 'v1',
    car: 'BMW M3 Competition (G80)',
    title: 'Custom LED Digital RPM Display & M-Stitching Demo',
    duration: '0:38',
    thumbnail: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-steering-wheel-close-up-42861-large.mp4',
    tags: ['LED Display', 'M-Stitching', 'Forged Carbon']
  },
  {
    id: 'v2',
    car: 'Porsche 911 GT3 (992)',
    title: 'Full Race Alcantara + Lizard Green Top Stripe In Action',
    duration: '0:45',
    thumbnail: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sport-car-driving-fast-at-night-42862-large.mp4',
    tags: ['Alcantara', 'GT3', 'Top Stripe']
  },
  {
    id: 'v3',
    car: 'Audi RS7 Sportback',
    title: 'Custom Red Honeycomb Weave & Magnetic Paddle Sound Test',
    duration: '0:29',
    thumbnail: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-steering-wheel-while-driving-41584-large.mp4',
    tags: ['Honeycomb Carbon', 'Magnetic Paddles', 'Audi RS']
  },
  {
    id: 'v4',
    car: 'Mercedes-AMG C63s',
    title: 'OEM Plug & Play Installation & Button Control Test',
    duration: '0:52',
    thumbnail: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dashboard-of-a-car-driving-at-night-42863-large.mp4',
    tags: ['Plug & Play', 'AMG', 'Nappa Leather']
  }
];

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  // Configurator States
  const [selectedCar, setSelectedCar] = useState(CAR_MODELS[0].id);
  const [shape, setShape] = useState<'flat-bottom' | 'round' | 'yoke'>('flat-bottom');
  const [carbonType, setCarbonType] = useState<'twill-gloss' | 'twill-matte' | 'forged' | 'honeycomb'>('twill-gloss');
  const [gripMaterial, setGripMaterial] = useState<'alcantara' | 'perforated' | 'nappa'>('alcantara');
  const [stitchingColor, setStitchingColor] = useState<string>('#ef4444'); // Red
  const [topStripeColor, setTopStripeColor] = useState<string>('#ef4444');
  const [hasLedDisplay, setHasLedDisplay] = useState<boolean>(true);
  const [paddleStyle, setPaddleStyle] = useState<'carbon' | 'extended' | 'oem'>('extended');
  const [airbagCover, setAirbagCover] = useState<'alcantara' | 'leather' | 'oem'>('alcantara');

  // Interactive UI States
  const [activeBrandFilter, setActiveBrandFilter] = useState<string>('ALL');
  const [videoModalUrl, setVideoModalUrl] = useState<{ url: string; title: string; car: string } | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'configurator' | 'showcase' | 'videos'>('overview');
  const [revLightsActive, setRevLightsActive] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sound toggle state for videos
  const [isMuted, setIsMuted] = useState(true);

  // Price Calculation Logic
  const basePrice = 1190;
  const computedPrice = useMemo(() => {
    let price = basePrice;
    if (carbonType === 'forged') price += 250;
    if (carbonType === 'honeycomb') price += 300;
    if (hasLedDisplay) price += 390;
    if (paddleStyle === 'extended') price += 180;
    if (airbagCover !== 'oem') price += 150;
    if (shape === 'yoke') price += 200;
    return price;
  }, [carbonType, hasLedDisplay, paddleStyle, airbagCover, shape]);

  // Simulate Rev Light blinking animation in preview
  useEffect(() => {
    if (!hasLedDisplay) return;
    const interval = setInterval(() => {
      setRevLightsActive((prev) => !prev);
    }, 1200);
    return () => clearInterval(interval);
  }, [hasLedDisplay]);

  const filteredBuilds = useMemo(() => {
    if (activeBrandFilter === 'ALL') return CUSTOM_BUILDS;
    return CUSTOM_BUILDS.filter(b => b.brand.toLowerCase() === activeBrandFilter.toLowerCase());
  }, [activeBrandFilter]);

  const currentCarDetails = CAR_MODELS.find(c => c.id === selectedCar);

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-slate-100 font-sans selection:bg-red-600 selection:text-white antialiased">
      
      {/* BACKGROUND GRAPHICS & LIGHTING */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] -right-[10%] w-[45vw] h-[45vw] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-amber-600/5 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0b0d]/80 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-lg shadow-red-600/30">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white uppercase italic">
                APEX<span className="text-red-500">CARBON</span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono -mt-1 tracking-widest">CUSTOM WHEELS STUDIO</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
            {[
              { id: 'overview', label: 'Home' },
              { id: 'configurator', label: 'Wheel Configurator' },
              { id: 'showcase', label: 'Car Showcase' },
              { id: 'videos', label: 'Video Samples' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  const el = document.getElementById(tab.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('configurator');
                const el = document.getElementById('configurator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-amber-500 p-px font-semibold text-xs transition-all duration-300 shadow-lg shadow-red-600/20 hover:shadow-red-600/40"
            >
              <div className="px-5 py-2.5 rounded-[11px] bg-slate-950 transition-all duration-300 group-hover:bg-transparent flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span className="text-white font-bold tracking-wider">DESIGN YOUR WHEEL</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">

        {/* HERO SECTION */}
        <section id="overview" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Text Content */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-medium tracking-wide">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bespoke Handcrafted Steering Wheels for Exotic & Supercars</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
                  ELEVATE YOUR <br />
                  <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-600 bg-clip-text text-transparent">
                    DRIVING INTERIOR
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                  Transform your cockpit with custom genuine carbon fiber, Italian Alcantara, custom stitching, 
                  and real-time LED telemetry displays. Plug-and-Play OEM airbag fitment for BMW, Porsche, Audi, AMG & more.
                </p>

                {/* Hero Feature Tags */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  {[
                    '100% Genuine Carbon Fiber',
                    'OEM Airbag Preserved',
                    'Plug & Play Harness',
                    'LED Shift RPM Lights',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-red-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <button
                    onClick={() => {
                      setActiveTab('configurator');
                      const el = document.getElementById('configurator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-red-600/30 hover:shadow-red-600/50 flex items-center justify-center gap-3 transition-all duration-300"
                  >
                    <Sliders className="w-5 h-5" />
                    <span>LAUNCH CONFIGURATOR</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('videos');
                      const el = document.getElementById('videos');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-md"
                  >
                    <Play className="w-4 h-4 text-red-500 fill-red-500" />
                    <span>WATCH SAMPLES & SOUNDS</span>
                  </button>
                </div>

                {/* Quick Stats Bar */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-center lg:text-left">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">1,400+</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Wheels Crafted</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">50+</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Car Models</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Fitment Guarantee</div>
                  </div>
                </div>

              </div>

              {/* Right Column Interactive Showcase Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Glowing halo behind wheel preview */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-amber-500/20 to-cyan-500/20 rounded-3xl blur-2xl transform rotate-3 scale-105" />
                  
                  <div className="relative bg-slate-900/90 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                        <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">FEATURED RECENT BUILD</span>
                      </div>
                      <span className="text-xs font-mono text-red-400 font-bold bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                        BMW M4 G82
                      </span>
                    </div>

                    {/* Image Preview Card */}
                    <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 group">
                      <img
                        src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
                        alt="BMW Custom Wheel Preview"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      {/* Play video preview badge */}
                      <button
                        onClick={() => setVideoModalUrl({
                          url: 'https://assets.mixkit.co/videos/preview/mixkit-car-steering-wheel-close-up-42861-large.mp4',
                          title: 'BMW M4 Forged Carbon LED Wheel Video Demo',
                          car: 'BMW M4 Competition'
                        })}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/50 transform scale-90 group-hover:scale-100 transition-transform">
                          <Play className="w-8 h-8 fill-white ml-1" />
                        </div>
                      </button>

                      {/* Specs Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <p className="text-xs font-mono text-amber-400 uppercase tracking-wider">Forged Carbon + Italian Alcantara</p>
                        <h3 className="text-lg font-bold text-white">M Performance Custom LED Wheel</h3>
                        <p className="text-xs text-slate-300 mt-1">Tri-Color M Stitching, Extended Paddles, Shift Display</p>
                      </div>
                    </div>

                    {/* Quick Specs Footer */}
                    <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>PRICE AS SHOWN: <strong className="text-white text-sm font-sans">$1,850</strong></span>
                      <button
                        onClick={() => {
                          setActiveTab('configurator');
                          const el = document.getElementById('configurator');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-red-400 font-bold hover:text-red-300 flex items-center gap-1"
                      >
                        Customize This <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* INTERACTIVE 2D/3D SIMULATED CONFIGURATOR SECTION */}
        <section id="configurator" className="py-20 bg-slate-950/80 border-y border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                LIVE INTERACTIVE STUDIO
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
                BUILD & PRICING CONFIGURATOR
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Customize material, stitching, shape, LED digital telemetry, and top stripe color. Real-time dynamic visual preview & transparent pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT / CENTER: INTERACTIVE WHEEL GRAPHIC PREVIEW CANVAS */}
              <div className="lg:col-span-7 bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 relative min-h-[480px] flex flex-col justify-between overflow-hidden shadow-2xl">
                
                {/* Header info bar */}
                <div className="flex items-center justify-between z-10 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-mono text-slate-400">SELECTED VEHICLE</p>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Car className="w-4 h-4 text-red-500" />
                      {currentCarDetails?.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">ESTIMATED PRICE</span>
                    <span className="text-2xl font-black text-red-500 font-mono">${computedPrice}</span>
                  </div>
                </div>

                {/* SVG SIMULATED DYNAMIC WHEEL DRAWING */}
                <div className="relative my-8 flex items-center justify-center">
                  
                  {/* Dynamic LED Light Bar Top Display Simulation */}
                  {hasLedDisplay && (
                    <div className="absolute -top-6 z-20 flex flex-col items-center">
                      <div className="bg-slate-950 border border-white/20 px-4 py-1.5 rounded-lg shadow-xl flex items-center gap-3">
                        {/* Simulated RPM Light LEDs */}
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((ledIndex) => {
                            let ledColor = 'bg-slate-700';
                            if (revLightsActive) {
                              if (ledIndex <= 3) ledColor = 'bg-emerald-500 shadow-[0_0_8px_#10b981]';
                              else if (ledIndex <= 6) ledColor = 'bg-amber-400 shadow-[0_0_8px_#f59e0b]';
                              else ledColor = 'bg-red-600 shadow-[0_0_10px_#dc2626] animate-pulse';
                            }
                            return <div key={ledIndex} className={`w-2 h-2 rounded-full transition-all duration-200 ${ledColor}`} />;
                          })}
                        </div>
                        <div className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest pl-2 border-l border-white/10">
                          {revLightsActive ? '6,800 RPM' : 'READY'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Steering Wheel Graphic Container */}
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 transition-all duration-500 transform hover:scale-[1.02]">
                    <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]">
                      <defs>
                        {/* Carbon pattern gradient effect */}
                        <pattern id="carbonPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                          <rect width="10" height="10" fill="#18181b" />
                          <path d="M0 5L5 0H10L5 10H0V5Z" fill="#27272a" />
                          <path d="M5 10L10 5V0L5 5L0 10H5Z" fill="#3f3f46" opacity="0.6" />
                        </pattern>
                        {/* Forged carbon pattern gradient effect */}
                        <pattern id="forgedPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                          <rect width="20" height="20" fill="#0f172a" />
                          <polygon points="2,2 8,6 4,14 1,8" fill="#334155" opacity="0.8" />
                          <polygon points="12,4 18,2 16,12 10,10" fill="#1e293b" opacity="0.9" />
                          <polygon points="6,12 14,16 8,19 2,16" fill="#475569" opacity="0.6" />
                        </pattern>
                      </defs>

                      {/* Extended Paddle Shifters behind wheel */}
                      {paddleStyle !== 'oem' && (
                        <g id="paddles">
                          {/* Left Paddle (-) */}
                          <path
                            d="M 45 100 Q 20 120 30 180 Q 55 160 55 120 Z"
                            fill={paddleStyle === 'extended' ? '#ef4444' : 'url(#carbonPattern)'}
                            stroke="#ffffff33"
                            strokeWidth="1.5"
                          />
                          <text x="35" y="145" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">-</text>

                          {/* Right Paddle (+) */}
                          <path
                            d="M 255 100 Q 280 120 270 180 Q 245 160 245 120 Z"
                            fill={paddleStyle === 'extended' ? '#ef4444' : 'url(#carbonPattern)'}
                            stroke="#ffffff33"
                            strokeWidth="1.5"
                          />
                          <text x="265" y="145" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>
                        </g>
                      )}

                      {/* MAIN OUTER WHEEL RING */}
                      {shape === 'yoke' ? (
                        /* Yoke Design Path */
                        <path
                          d="M 60 110 Q 150 130 240 110 L 250 210 Q 150 250 50 210 Z"
                          fill="none"
                          stroke={carbonType === 'forged' ? 'url(#forgedPattern)' : 'url(#carbonPattern)'}
                          strokeWidth="38"
                          strokeLinecap="round"
                        />
                      ) : (
                        /* Round or Flat-Bottom Design Path */
                        <path
                          d={
                            shape === 'flat-bottom'
                              ? 'M 50 150 A 100 100 0 1 1 250 150 L 210 240 Q 150 250 90 240 Z'
                              : 'M 150 50 A 100 100 0 1 1 149.9 50'
                          }
                          fill="none"
                          stroke={carbonType === 'forged' ? 'url(#forgedPattern)' : 'url(#carbonPattern)'}
                          strokeWidth="36"
                          strokeLinecap="round"
                        />
                      )}

                      {/* Side Grips Overlay (Alcantara / Leather) */}
                      <path
                        d="M 52 110 A 98 98 0 0 0 52 200"
                        fill="none"
                        stroke={gripMaterial === 'alcantara' ? '#27272a' : '#09090b'}
                        strokeWidth="38"
                        strokeDasharray={gripMaterial === 'perforated' ? '2 2' : 'none'}
                      />
                      <path
                        d="M 248 110 A 98 98 0 0 1 248 200"
                        fill="none"
                        stroke={gripMaterial === 'alcantara' ? '#27272a' : '#09090b'}
                        strokeWidth="38"
                        strokeDasharray={gripMaterial === 'perforated' ? '2 2' : 'none'}
                      />

                      {/* Top Stripe (12 O'Clock Marker) */}
                      {shape !== 'yoke' && topStripeColor !== 'none' && (
                        <path
                          d="M 144 50 A 100 100 0 0 1 156 50"
                          fill="none"
                          stroke={topStripeColor}
                          strokeWidth="38"
                        />
                      )}

                      {/* Custom Stitching Accent Line */}
                      <path
                        d="M 68 100 A 82 82 0 0 0 68 210"
                        fill="none"
                        stroke={stitchingColor}
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />
                      <path
                        d="M 232 100 A 82 82 0 0 1 232 210"
                        fill="none"
                        stroke={stitchingColor}
                        strokeWidth="2"
                        strokeDasharray="4 3"
                      />

                      {/* Center Hub & Airbag Cap */}
                      <circle cx="150" cy="160" r="48" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
                      <circle cx="150" cy="160" r="42" fill="#09090b" />
                      
                      {/* Car Brand Logo Placeholder / Emblem */}
                      <circle cx="150" cy="160" r="18" fill="#1e293b" stroke="#ffffff33" strokeWidth="1" />
                      <text x="150" y="164" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" className="uppercase font-mono">
                        {currentCarDetails?.brand}
                      </text>

                      {/* Steering Spokes */}
                      <path d="M 102 160 L 60 160" stroke="#3f3f46" strokeWidth="14" strokeLinecap="round" />
                      <path d="M 198 160 L 240 160" stroke="#3f3f46" strokeWidth="14" strokeLinecap="round" />
                      <path d="M 150 208 L 150 240" stroke="#3f3f46" strokeWidth="16" strokeLinecap="round" />
                    </svg>
                  </div>

                </div>

                {/* Bottom Visual Features Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-white/10 z-10 text-[11px] text-slate-300">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 block text-[10px]">SHAPE</span>
                    <strong className="text-white uppercase">{shape}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 block text-[10px]">CARBON</span>
                    <strong className="text-white uppercase">{carbonType}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 block text-[10px]">GRIP</span>
                    <strong className="text-white uppercase">{gripMaterial}</strong>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-slate-400 block text-[10px]">TELEMETRY</span>
                    <strong className={hasLedDisplay ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {hasLedDisplay ? 'ENABLED' : 'NONE'}
                    </strong>
                  </div>
                </div>

              </div>

              {/* RIGHT: CONTROLS & SELECTION PANEL */}
              <div className="lg:col-span-5 bg-slate-900/60 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-red-500" />
                    <span>CUSTOMIZATION OPTIONS</span>
                  </h3>
                  <button
                    onClick={() => {
                      setShape('flat-bottom');
                      setCarbonType('twill-gloss');
                      setGripMaterial('alcantara');
                      setStitchingColor('#ef4444');
                      setTopStripeColor('#ef4444');
                      setHasLedDisplay(true);
                      setPaddleStyle('extended');
                    }}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </div>

                {/* 1. Select Vehicle */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                    1. Select Vehicle Model
                  </label>
                  <select
                    value={selectedCar}
                    onChange={(e) => setSelectedCar(e.target.value)}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-medium"
                  >
                    {CAR_MODELS.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Wheel Profile / Shape */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                    2. Steering Wheel Shape
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'flat-bottom', label: 'Flat-Bottom' },
                      { id: 'round', label: 'Full Round' },
                      { id: 'yoke', label: 'Race Yoke (+$200)' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setShape(item.id as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          shape === item.id
                            ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30'
                            : 'bg-slate-950 border-white/10 text-slate-300 hover:border-white/25'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Carbon Fiber Finish */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                    3. Carbon Fiber Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'twill-gloss', label: '2x2 Gloss Twill' },
                      { id: 'twill-matte', label: '2x2 Matte Twill' },
                      { id: 'forged', label: 'Forged Carbon (+$250)' },
                      { id: 'honeycomb', label: 'Honeycomb (+$300)' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCarbonType(item.id as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-left ${
                          carbonType === item.id
                            ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30'
                            : 'bg-slate-950 border-white/10 text-slate-300 hover:border-white/25'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Side Grips Material */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                    4. Side Grip Material
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'alcantara', label: 'Italian Alcantara' },
                      { id: 'perforated', label: 'Perforated Leather' },
                      { id: 'nappa', label: 'Smooth Nappa' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setGripMaterial(item.id as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          gripMaterial === item.id
                            ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30'
                            : 'bg-slate-950 border-white/10 text-slate-300 hover:border-white/25'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Stitching & Top Stripe Colors */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Stitching Color Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                      Stitching Accent
                    </label>
                    <div className="flex items-center gap-2">
                      {['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ffffff'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setStitchingColor(color)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            stitchingColor === color ? 'scale-110 border-white shadow-md' : 'border-transparent opacity-80'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Top Stripe Color Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                      12 O'Clock Stripe
                    </label>
                    <div className="flex items-center gap-2">
                      {['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ffffff'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setTopStripeColor(color)}
                          className={`w-7 h-7 rounded-full border-2 transition-transform ${
                            topStripeColor === color ? 'scale-110 border-white shadow-md' : 'border-transparent opacity-80'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 6. LED Digital RPM Telemetry Display Toggle */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>LED Shift Light Telemetry Screen</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Real-time RPM LED bar, speed & oil temp (+$390)</p>
                  </div>
                  <button
                    onClick={() => setHasLedDisplay(!hasLedDisplay)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                      hasLedDisplay ? 'bg-red-600' : 'bg-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        hasLedDisplay ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* ORDER BUTTON */}
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-red-600/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>REQUEST BUILD & GET QUOTE (${computedPrice})</span>
                </button>

              </div>

            </div>

          </div>
        </section>

        {/* CAR SPECIFIC PORTFOLIO / SHOWCASE GRID */}
        <section id="showcase" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                REAL INSTALLED BUILDS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
                CAR MODEL GALLERY
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'BMW', 'Porsche', 'Audi', 'Mercedes', 'Corvette', 'Nissan'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setActiveBrandFilter(brand)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeBrandFilter === brand
                      ? 'bg-white text-slate-950 shadow-lg'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Builds */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBuilds.map((build) => (
              <motion.div
                key={build.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden group hover:border-red-500/50 transition-all duration-300 shadow-xl"
              >
                {/* Image Container with Video Trigger */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={build.image}
                    alt={build.carName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Play Video Modal Button */}
                  <button
                    onClick={() => setVideoModalUrl({ url: build.videoUrl, title: build.tagline, car: build.carName })}
                    className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-xs font-mono text-white flex items-center gap-1.5 hover:bg-red-600 transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Watch Clip
                  </button>

                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-mono uppercase bg-red-600 text-white font-bold px-2 py-0.5 rounded">
                      {build.brand}
                    </span>
                  </div>
                </div>

                {/* Specs Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {build.carName}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{build.tagline}</p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Carbon:</span>
                      <span className="text-white font-medium">{build.specs.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Grip:</span>
                      <span className="text-white font-medium">{build.specs.grip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Stitching:</span>
                      <span className="text-white font-medium">{build.specs.stitching}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Telemetry:</span>
                      <span className={build.specs.ledDisplay ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {build.specs.ledDisplay ? 'LED Shift Display' : 'Standard Trim'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">STARTING AT</span>
                      <span className="text-lg font-black text-white font-mono">${build.price}</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCar(CAR_MODELS.find(c => c.name.includes(build.brand))?.id || CAR_MODELS[0].id);
                        setActiveTab('configurator');
                        const el = document.getElementById('configurator');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-bold text-white transition-all flex items-center gap-1"
                    >
                      Clone Specs <ChevronRight className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </section>

        {/* VIDEO SAMPLE SHOWCASE & SOUND SECTION */}
        <section id="videos" className="py-20 bg-slate-950/90 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                VIDEO & SOUND SAMPLES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
                SEE & HEAR IT IN ACTION
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Watch dynamic turn-on sequences, LED telemetry animations, and tactile paddle shifter click tests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {VIDEO_SAMPLE_COLLECTION.map((video) => (
                <div
                  key={video.id}
                  className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden group hover:border-red-500/40 transition-all duration-300 shadow-2xl flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent" />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => setVideoModalUrl({ url: video.videoUrl, title: video.title, car: video.car })}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xl shadow-red-600/50 transform group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </div>
                    </button>

                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-slate-300 border border-white/10">
                      {video.car}
                    </div>

                    <div className="absolute bottom-4 right-4 bg-slate-950/90 px-2.5 py-1 rounded text-xs font-mono text-white">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {video.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {video.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 px-2.5 py-1 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CRAFTSMANSHIP & FEATURES SECTION */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">100% Pre-Preg Carbon Fiber</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utilizing vacuum-autoclaved 3K carbon fiber weaves for extreme durability, zero UV yellowing, and minimum weight addition.
              </p>
            </div>

            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">OEM Airbag Fit Guarantee</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We rebuild on original manufacturer core cores. Your factory airbag, buttons, and steering controls transfer over seamlessly with zero codes.
              </p>
            </div>

            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">OBD2 Wireless Telemetry</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our LED displays connect wirelessly to your car's OBD2 port to read RPM, speed, water temperature, battery voltage, and lap timers.
              </p>
            </div>

          </div>
        </section>

        {/* CUSTOMER REVIEWS / HALL OF FAME */}
        <section className="py-20 bg-slate-950 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl font-black text-white tracking-tight">OWNERS DRIVING WITH APEX CARBON</h2>
              <p className="text-slate-400 text-sm mt-2">Read real feedback from car enthusiasts around the globe.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "The LED shift screen is insanely responsive on my M3 G80. Fits better than OEM and the forged carbon weave match is 10/10.",
                  name: "Marcus V.",
                  car: "BMW M3 Competition",
                  rating: 5
                },
                {
                  quote: "Shipped in 3 weeks, plug-and-play harness took 20 minutes to install. Smells like authentic Italian Alcantara!",
                  name: "David K.",
                  car: "Porsche 911 GT3 (992)",
                  rating: 5
                },
                {
                  quote: "The honeycomb carbon weave with red stitching turned my Audi RS6 interior into a spaceship. Highly recommended!",
                  name: "Sandro M.",
                  car: "Audi RS6 Avant",
                  rating: 5
                }
              ].map((rev, i) => (
                <div key={i} className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic">"{rev.quote}"</p>
                  <div className="pt-2 border-t border-white/10">
                    <strong className="text-white text-sm block">{rev.name}</strong>
                    <span className="text-xs text-red-400 font-mono">{rev.car}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/10 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-red-500" />
            <span className="text-white font-bold tracking-widest uppercase">APEX CARBON WHEELS STUDIO</span>
          </div>

          <div className="flex items-center gap-6 font-mono">
            <span>BMW</span>
            <span>PORSCHE</span>
            <span>AUDI</span>
            <span>MERCEDES-AMG</span>
            <span>CORVETTE</span>
            <span>NISSAN</span>
          </div>

          <p>© {new Date().getFullYear()} Apex Carbon Studio. Handcrafted Performance Equipment.</p>
        </div>
      </footer>

      {/* VIDEO POPUP MODAL */}
      <AnimatePresence>
        {videoModalUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setVideoModalUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/20 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-red-400 uppercase font-bold">{videoModalUrl.car}</span>
                  <h3 className="text-base font-bold text-white">{videoModalUrl.title}</h3>
                </div>
                <button
                  onClick={() => setVideoModalUrl(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video bg-black">
                <video
                  src={videoModalUrl.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-4 bg-slate-950 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>PLUG & PLAY INSTALLATION PREVIEW</span>
                <button
                  onClick={() => {
                    setVideoModalUrl(null);
                    setActiveTab('configurator');
                    const el = document.getElementById('configurator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-red-400 font-bold hover:underline"
                >
                  Configure Wheel Like This →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INQUIRY / ORDER SUMMARY MODAL */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOrderModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!formSubmitted ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                      BUILD SUMMARY & INQUIRY
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">Submit Your Wheel Specs</h3>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 space-y-2 text-xs font-mono text-slate-300">
                    <div className="flex justify-between border-b border-white/10 pb-2 text-white font-bold">
                      <span>CAR:</span>
                      <span>{currentCarDetails?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">SHAPE:</span>
                      <span className="uppercase">{shape}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">CARBON:</span>
                      <span className="uppercase">{carbonType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">GRIP:</span>
                      <span className="uppercase">{gripMaterial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">TELEMETRY:</span>
                      <span>{hasLedDisplay ? 'YES (LED RPM Lights)' : 'NO'}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10 text-sm text-red-400 font-bold">
                      <span>ESTIMATED QUOTE:</span>
                      <span>${computedPrice}</span>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">YOUR FULL NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Rossi"
                        className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 block mb-1">CAR YEAR & VIN / TRIM (OPTIONAL)</label>
                      <input
                        type="text"
                        placeholder="e.g. 2023 BMW M4 Competition xDrive"
                        className="w-full bg-slate-950 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Send className="w-4 h-4" />
                      <span>SUBMIT SPECS & RESERVE ORDER</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">BUILD RESERVED!</h3>
                  <p className="text-slate-300 text-sm max-w-sm mx-auto">
                    Thank you! Our master craftsman will review your <strong>{currentCarDetails?.name}</strong> specifications and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setIsOrderModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}