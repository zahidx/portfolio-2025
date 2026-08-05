"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe as GlobeIcon, 
  MapPin, 
  Compass, 
  Zap, 
  Users, 
  Navigation, 
  RefreshCw, 
  Maximize2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { db, collection, getDocs, addDoc } from "./firebase";

/* ── Default World Cities & Sampled Land Dots for 3D Globe ── */
const DEFAULT_VISITORS = [
  { id: "v1", city: "Dhaka", country: "Bangladesh", countryCode: "BD", lat: 23.8103, lng: 90.4125, isHub: true },
  { id: "v2", city: "San Francisco", country: "United States", countryCode: "US", lat: 37.7749, lng: -122.4194 },
  { id: "v3", city: "London", country: "United Kingdom", countryCode: "GB", lat: 51.5074, lng: -0.1278 },
  { id: "v4", city: "Tokyo", country: "Japan", countryCode: "JP", lat: 35.6762, lng: 139.6503 },
  { id: "v5", city: "Berlin", country: "Germany", countryCode: "DE", lat: 52.52, lng: 13.405 },
  { id: "v6", city: "Sydney", country: "Australia", countryCode: "AU", lat: -33.8688, lng: 151.2093 },
  { id: "v7", city: "Toronto", country: "Canada", countryCode: "CA", lat: 43.6532, lng: -79.3832 },
  { id: "v8", city: "Singapore", country: "Singapore", countryCode: "SG", lat: 1.3521, lng: 103.8198 },
  { id: "v9", city: "Dubai", country: "United Arab Emirates", countryCode: "AE", lat: 25.2048, lng: 55.2708 },
  { id: "v10", city: "Paris", country: "France", countryCode: "FR", lat: 48.8566, lng: 2.3522 },
  { id: "v11", city: "New York", country: "United States", countryCode: "US", lat: 40.7128, lng: -74.006 },
  { id: "v12", city: "Amsterdam", country: "Netherlands", countryCode: "NL", lat: 52.3676, lng: 4.9041 },
];

/* ── Generate Landmass Sphere Coordinates ── */
function generateLandPoints() {
  const points = [];
  const count = 1000;
  
  // Approximate continent boundaries using lat/lng boxes
  const continentBoxes = [
    // North America
    { minLat: 15, maxLat: 70, minLng: -160, maxLng: -50 },
    // South America
    { minLat: -55, maxLat: 12, minLng: -80, maxLng: -35 },
    // Europe
    { minLat: 35, maxLat: 70, minLng: -10, maxLng: 40 },
    // Africa
    { minLat: -35, maxLat: 37, minLng: -18, maxLng: 50 },
    // Asia
    { minLat: 5, maxLat: 75, minLng: 40, maxLng: 145 },
    // Australia
    { minLat: -42, maxLat: -10, minLng: 112, maxLng: 155 },
  ];

  let seed = 12345;
  function rnd() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  for (let i = 0; i < count; i++) {
    const box = continentBoxes[Math.floor(rnd() * continentBoxes.length)];
    const lat = box.minLat + rnd() * (box.maxLat - box.minLat);
    const lng = box.minLng + rnd() * (box.maxLng - box.minLng);
    points.push({ lat, lng });
  }

  return points;
}

/* ── Distance Calculator (Haversine formula) ── */
function calcDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export default function VisitorGlobe() {
  const canvasRef = useRef(null);
  const [visitorList, setVisitorList] = useState(DEFAULT_VISITORS);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [rotation, setRotation] = useState({ x: 0.3, y: 0 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  const landPoints = useMemo(() => generateLandPoints(), []);

  /* ── 1. Fetch / Track Visitor Geo and Sync Firebase Firestore ── */
  useEffect(() => {
    let isMounted = true;

    async function initGeoAndFirebase() {
      // 1. Read existing locations from Firebase Firestore
      try {
        const querySnapshot = await getDocs(collection(db, "visitor_locations"));
        const fbDocs = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.lat && data.lng && data.city) {
            fbDocs.push({
              id: doc.id,
              city: data.city,
              country: data.country || "Global Visitor",
              countryCode: data.countryCode || "UN",
              lat: Number(data.lat),
              lng: Number(data.lng),
            });
          }
        });

        if (isMounted && fbDocs.length > 0) {
          // Merge defaults with Firebase records to ensure density
          const combined = [...fbDocs, ...DEFAULT_VISITORS];
          const unique = Array.from(new Set(combined.map((v) => `${v.city}-${v.country}`)))
            .map((key) => combined.find((v) => `${v.city}-${v.country}` === key));
          setVisitorList(unique);
        }
      } catch (err) {
        console.log("Firebase visitor fetch info:", err.message);
      }

      // 2. Fetch current user's geo IP location
      try {
        const geoRes = await fetch("https://ipapi.co/json/");
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.latitude && geoData.longitude && isMounted) {
            const userLoc = {
              city: geoData.city || "Visitor City",
              country: geoData.country_name || "Visitor Country",
              countryCode: geoData.country_code || "UN",
              lat: geoData.latitude,
              lng: geoData.longitude,
            };

            setCurrentLocation(userLoc);

            // Log new visit to Firebase Firestore (silently)
            try {
              await addDoc(collection(db, "visitor_locations"), {
                ...userLoc,
                timestamp: new Date(),
                userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
              });
            } catch (e) {
              console.log("Firestore logging note:", e.message);
            }

            // Append current user to active globe view
            setVisitorList((prev) => {
              const exists = prev.some((p) => p.city === userLoc.city && p.country === userLoc.country);
              return exists ? prev : [userLoc, ...prev];
            });
          }
        }
      } catch (err) {
        console.log("Geo IP lookup skipped:", err.message);
      }
    }

    initGeoAndFirebase();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ── 2. Render 3D Canvas Globe Loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let rotX = rotation.x;
    let rotY = rotation.y;
    let pulseTime = 0;

    const render = () => {
      if (!canvas) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.38;
      const centerX = width / 2;
      const centerY = height / 2;

      // Auto rotation
      if (isSpinning && !isDragging.current) {
        rotY += 0.004;
      }
      pulseTime += 0.03;

      // Projection Helper: Convert (lat, lng) -> (x, y, z) 3D sphere coordinates
      const project = (lat, lng, radiusOffset = 0) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180) + rotY;
        const r = radius + radiusOffset;

        // 3D Cartesian coordinates
        let x = -(r * Math.sin(phi) * Math.cos(theta));
        let z = r * Math.sin(phi) * Math.sin(theta);
        let y = r * Math.cos(phi);

        // Apply pitch (rotX)
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;

        return {
          x: centerX + x,
          y: centerY + y2,
          z: z2,
          visible: z2 > 0, // Facing camera
        };
      };

      // ── A. Draw Atmosphere Glow Rim ──
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.85,
        centerX,
        centerY,
        radius * 1.25
      );
      glowGrad.addColorStop(0, "rgba(99, 102, 241, 0.15)");
      glowGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.08)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // ── B. Draw Base Globe Sphere ──
      const sphereGrad = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius
      );
      sphereGrad.addColorStop(0, "#1e1b4b");
      sphereGrad.addColorStop(0.6, "#0f172a");
      sphereGrad.addColorStop(1, "#020617");

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ── C. Draw Lat / Lng Grid Lines ──
      ctx.strokeStyle = "rgba(99, 102, 241, 0.08)";
      ctx.lineWidth = 1;

      // Latitudes
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 10) {
          const pt = project(lat, lng);
          if (pt.visible) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // Longitudes
      for (let lng = -180; lng < 180; lng += 45) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 10) {
          const pt = project(lat, lng);
          if (pt.visible) {
            if (first) {
              ctx.moveTo(pt.x, pt.y);
              first = false;
            } else {
              ctx.lineTo(pt.x, pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // ── D. Draw Landmass Dots ──
      landPoints.forEach((pt) => {
        const p = project(pt.lat, pt.lng);
        if (p.visible) {
          const alpha = Math.max(0.1, p.z / radius);
          ctx.fillStyle = `rgba(129, 140, 248, ${alpha * 0.45})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Find Dhaka Hub coords
      const dhakaHub = visitorList.find((v) => v.isHub) || DEFAULT_VISITORS[0];
      const dhakaPt = project(dhakaHub.lat, dhakaHub.lng);

      // ── E. Draw Connecting 3D Arcs to Dhaka ──
      visitorList.forEach((v) => {
        if (v.isHub) return;
        const vPt = project(v.lat, v.lng);

        if (vPt.visible || dhakaPt.visible) {
          const midLat = (v.lat + dhakaHub.lat) / 2 + 15;
          const midLng = (v.lng + dhakaHub.lng) / 2;
          const midPt = project(midLat, midLng, radius * 0.25);

          // Draw Arc Line
          ctx.beginPath();
          ctx.moveTo(vPt.x, vPt.y);
          ctx.quadraticCurveTo(midPt.x, midPt.y, dhakaPt.x, dhakaPt.y);

          const arcGrad = ctx.createLinearGradient(vPt.x, vPt.y, dhakaPt.x, dhakaPt.y);
          arcGrad.addColorStop(0, "rgba(236, 72, 153, 0.4)");
          arcGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.6)");
          arcGrad.addColorStop(1, "rgba(52, 211, 153, 0.5)");

          ctx.strokeStyle = arcGrad;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated Traveling Photon Dot along Arc
          const t = (pulseTime * 0.5 + Math.abs(v.lat)) % 1;
          const px = (1 - t) * (1 - t) * vPt.x + 2 * (1 - t) * t * midPt.x + t * t * dhakaPt.x;
          const py = (1 - t) * (1 - t) * vPt.y + 2 * (1 - t) * t * midPt.y + t * t * dhakaPt.y;

          ctx.fillStyle = "#f472b6";
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // ── F. Draw Visitor Pins & Dhaka Hub Marker ──
      visitorList.forEach((v) => {
        const pt = project(v.lat, v.lng);
        if (!pt.visible) return;

        const isHub = v.isHub;
        const pulseSize = Math.sin(pulseTime * 3) * 3 + (isHub ? 12 : 8);

        // Pulsing Ring
        ctx.fillStyle = isHub ? "rgba(52, 211, 153, 0.25)" : "rgba(236, 72, 153, 0.25)";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Pin Dot Core
        ctx.fillStyle = isHub ? "#34d399" : "#ec4899";
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isHub ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // City Label (for Hub or hovered)
        if (isHub || (selectedVisitor && selectedVisitor.city === v.city)) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 11px monospace";
          ctx.fillText(`${v.city} ${isHub ? "★ (HQ)" : ""}`, pt.x + 8, pt.y + 4);
        }
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [rotation, isSpinning, visitorList, landPoints, selectedVisitor]);

  /* ── 3. Mouse & Touch Drag Handlers ── */
  const handleMouseDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    setRotation((prev) => ({
      x: Math.max(-Math.PI / 3, Math.min(Math.PI / 3, prev.x + deltaY * 0.005)),
      y: prev.y + deltaX * 0.005,
    }));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const totalCountries = useMemo(
    () => new Set(visitorList.map((v) => v.country)).size,
    [visitorList]
  );

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-10 lg:px-16 bg-slate-950 text-white relative overflow-hidden" id="visitor-globe">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 text-xs font-mono tracking-widest uppercase mb-3 shadow-lg shadow-indigo-950/50">
            <GlobeIcon className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>GLOBAL VISITOR TELEMETRY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            Interactive 3D Visitor Globe
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Live 3D telemetry tracking global engineering visits and connecting recruiters & developers worldwide to Zahid&apos;s hub in Dhaka.
          </p>
        </motion.div>

        {/* Live Metrics Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8"
        >
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg sm:text-xl font-black text-white truncate">{visitorList.length}+</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono leading-tight truncate">Global Visitors</p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg sm:text-xl font-black text-white truncate">{totalCountries}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono leading-tight truncate">Countries Reached</p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-xl font-black text-white truncate">Dhaka, BD</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono leading-tight truncate">Engineering HQ</p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="p-2.5 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-sm sm:text-lg font-black text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">Live Sync</span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 font-mono leading-tight truncate">Firebase Firestore</p>
            </div>
          </div>
        </motion.div>

        {/* 3D Globe Stage & Controls */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/95 backdrop-blur-2xl p-4 sm:p-8 shadow-2xl overflow-hidden flex flex-col items-center"
        >
          {/* Controls Overlay Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-4 z-10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] sm:text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
                <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 shrink-0" />
                <span>Drag to Rotate <span className="hidden sm:inline">3D Globe</span></span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => setIsSpinning((prev) => !prev)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border text-[11px] sm:text-xs font-mono font-bold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isSpinning
                    ? "bg-indigo-600/30 border-indigo-500/50 text-indigo-300"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                }`}
              >
                <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isSpinning ? "animate-spin" : ""}`} />
                <span>{isSpinning ? "Auto-Spin" : "Manual"}</span>
              </button>
              <button
                onClick={() => setRotation({ x: 0.3, y: 0 })}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-[11px] sm:text-xs font-mono font-bold transition-all whitespace-nowrap shrink-0"
                title="Reset View"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Interactive Canvas 3D Sphere Stage */}
          <div
            className="relative w-full h-[380px] sm:h-[500px] cursor-grab active:cursor-grabbing flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas ref={canvasRef} className="w-full h-full max-w-[650px] max-h-[500px]" />
          </div>

          {/* Visitor Location Cards Carousel */}
          <div className="w-full mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Recent Global Visitor Feeds</span>
              </h4>
              {currentLocation && (
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">
                  📍 Your Location: {currentLocation.city}, {currentLocation.country}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {visitorList.slice(0, 6).map((v, i) => {
                const dist = calcDistanceKm(23.8103, 90.4125, v.lat, v.lng);
                return (
                  <div
                    key={v.id || i}
                    onMouseEnter={() => setSelectedVisitor(v)}
                    onMouseLeave={() => setSelectedVisitor(null)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      v.isHub
                        ? "bg-emerald-950/40 border-emerald-500/40 hover:border-emerald-400"
                        : selectedVisitor?.city === v.city
                        ? "bg-indigo-950/60 border-indigo-500/60"
                        : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white truncate">{v.city}</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {v.countryCode}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mb-1">{v.country}</p>
                    <div className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-indigo-400" />
                      <span>{v.isHub ? "HQ Hub" : `${dist.toLocaleString()} km away`}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
