import { useEffect, useRef, useState } from "react";

const GOLD = "#D4AF37";
const GOLD_BRIGHT = "#FFD700";
const GOLD_DIM = "rgba(212,175,55,0.35)";

const cities = [
  { id: "makkah", name: "Makkah", lat: 21.3891, lng: 39.8579, hub: true },

  // Middle East / Asia hubs
  { id: "dubai", name: "Dubai", lat: 25.2048, lng: 55.2708, hub: false },
  { id: "islamabad", name: "Islamabad", lat: 33.6844, lng: 73.0479, hub: false },
  { id: "karachi", name: "Karachi", lat: 24.8607, lng: 67.0011, hub: false },
  { id: "lahore", name: "Lahore", lat: 31.5204, lng: 74.3587, hub: false },
  { id: "dhaka", name: "Dhaka", lat: 23.8103, lng: 90.4125, hub: false },
  { id: "jakarta", name: "Jakarta", lat: -6.2088, lng: 106.8456, hub: false },
  { id: "riyadh", name: "Riyadh", lat: 24.7136, lng: 46.6753, hub: false },
  { id: "istanbul", name: "Istanbul", lat: 41.0082, lng: 28.9784, hub: false },
  { id: "cairo", name: "Cairo", lat: 30.0444, lng: 31.2357, hub: false },

  // Europe
  { id: "london", name: "London", lat: 51.5074, lng: -0.1278, hub: false },
  { id: "paris", name: "Paris", lat: 48.8566, lng: 2.3522, hub: false },
  { id: "berlin", name: "Berlin", lat: 52.52, lng: 13.405, hub: false },
  { id: "rome", name: "Rome", lat: 41.9028, lng: 12.4964, hub: false },
  { id: "madrid", name: "Madrid", lat: 40.4168, lng: -3.7038, hub: false },
  { id: "amsterdam", name: "Amsterdam", lat: 52.3676, lng: 4.9041, hub: false },

  // Americas
  { id: "newyork", name: "New York", lat: 40.7128, lng: -74.006, hub: false },
  { id: "losangeles", name: "Los Angeles", lat: 34.0522, lng: -118.2437, hub: false },
  { id: "toronto", name: "Toronto", lat: 43.6532, lng: -79.3832, hub: false },
  { id: "chicago", name: "Chicago", lat: 41.8781, lng: -87.6298, hub: false },

  // Africa
  { id: "capetown", name: "Cape Town", lat: -33.9249, lng: 18.4241, hub: false },
  { id: "safrica", name: "Johannesburg", lat: -26.2041, lng: 28.0473, hub: false },
];

const arcs = cities
  .filter((c) => !c.hub)
  .map((c) => ({
    startLat: 21.3891,
    startLng: 39.8579,
    endLat: c.lat,
    endLng: c.lng,
    color: [GOLD, GOLD_DIM],
    label: `Makkah → ${c.name}`,
  }));

export default function GlobalStats() {
  const containerRef = useRef(null);
  const globeInstanceRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let destroyed = false;

    const initGlobe = async () => {
      const GlobeModule = await import("globe.gl");
      const Globe = GlobeModule.default;
      const THREE = await import("three");

      if (destroyed || !containerRef.current) return;

      const el = containerRef.current;

      const globe = Globe()
        .globeImageUrl("")
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(true)
        .atmosphereColor("#1a6b4a")
        .atmosphereAltitude(0.18)
        .pointsData(cities)
        .pointLat("lat")
        .pointLng("lng")
        .pointColor((d) => (d.hub ? GOLD_BRIGHT : GOLD))
        .pointAltitude((d) => (d.hub ? 0.02 : 0.012))
        .pointRadius((d) => (d.hub ? 0.6 : 0.4))
        .pointLabel("")
        .onPointHover((pt, ev) => {
          if (!pt) { setTooltip((t) => ({ ...t, visible: false })); return; }
          const rect = el.getBoundingClientRect();
          setTooltip({
            visible: true,
            text: pt.hub ? `${pt.name} — Central Hub` : pt.name,
            x: (ev?.clientX ?? 0) - rect.left + 14,
            y: (ev?.clientY ?? 0) - rect.top - 10,
          });
        })
        .arcsData(arcs)
        .arcStartLat("startLat")
        .arcStartLng("startLng")
        .arcEndLat("endLat")
        .arcEndLng("endLng")
        .arcColor("color")
        .arcAltitude(0.32)
        .arcStroke(0.45)
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(2200)
        .onArcHover((arc, ev) => {
          if (!arc) { setTooltip((t) => ({ ...t, visible: false })); return; }
          const rect = el.getBoundingClientRect();
          setTooltip({
            visible: true,
            text: arc.label,
            x: (ev?.clientX ?? 0) - rect.left + 14,
            y: (ev?.clientY ?? 0) - rect.top - 10,
          });
        })
        .labelsData(cities)
        .labelLat("lat")
        .labelLng("lng")
        .labelText("name")
        .labelSize((d) => (d.hub ? 1.5 : 1.1))
        .labelDotRadius(0)
        .labelColor((d) => (d.hub ? GOLD_BRIGHT : "rgba(230,210,140,0.9)"))
        .labelResolution(3)
        .labelAltitude(0.025)(el);

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.35;
      globe.controls().enableZoom = true;
      
      // Increased Zoom by lowering altitude value from 2.2 down to 1.5
      globe.pointOfView({ lat: 21.3891, lng: 39.8579, altitude: 1.5 }, 0);

      const scene = globe.scene();

      const addGrid = () => {
        const mat = new THREE.LineBasicMaterial({
          color: 0x1a4d35,
          transparent: true,
          opacity: 0.3,
        });
        const R = 101;
        for (let lat = -80; lat <= 80; lat += 20) {
          const pts = [];
          for (let lng = 0; lng <= 360; lng += 3) {
            const phi = ((90 - lat) * Math.PI) / 180;
            const theta = (lng * Math.PI) / 180;
            pts.push(new THREE.Vector3(
              R * Math.sin(phi) * Math.cos(theta),
              R * Math.cos(phi),
              R * Math.sin(phi) * Math.sin(theta)
            ));
          }
          scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
        }
        for (let lng = 0; lng < 360; lng += 20) {
          const pts = [];
          for (let lat = -90; lat <= 90; lat += 3) {
            const phi = ((90 - lat) * Math.PI) / 180;
            const theta = (lng * Math.PI) / 180;
            pts.push(new THREE.Vector3(
              R * Math.sin(phi) * Math.cos(theta),
              R * Math.cos(phi),
              R * Math.sin(phi) * Math.sin(theta)
            ));
          }
          scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
        }
      };

      const styleLandmass = () => {
        scene.traverse((obj) => {
          if (obj.isMesh && obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((mat) => {
              if (mat.map) { mat.color.set(0x051a14); mat.needsUpdate = true; }
            });
          }
        });
      };

      setTimeout(() => {
        if (!destroyed) { addGrid(); styleLandmass(); setLoaded(true); }
      }, 600);

      globeInstanceRef.current = globe;
    };

    initGlobe();

    return () => {
      destroyed = true;
      if (globeInstanceRef.current) {
        globeInstanceRef.current._destructor?.();
        globeInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !globeInstanceRef.current) return;
    const ro = new ResizeObserver(() => {
      if (globeInstanceRef.current && containerRef.current) {
        globeInstanceRef.current.width(containerRef.current.clientWidth);
        globeInstanceRef.current.height(containerRef.current.clientHeight);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [loaded]);

  return (
    <section
      className="w-full py-10 px-4"
      style={{ backgroundColor: "#051A14" }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">

        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          250+ Blessed Journeys
          <br />
          Handled <span style={{ color: GOLD }}>Globally.</span>
        </h2>

        <p className="text-emerald-100/60 text-sm md:text-base leading-relaxed max-w-md mb-10">
          Our commitment to spiritual excellence spans continents, ensuring a
          seamless arrival to the sacred lands from anywhere in the world.
        </p>

        <div
          className="w-full rounded-2xl overflow-hidden border border-white/10 relative"
          style={{ backgroundColor: "#07221b", height: "460px" }}
        >
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 rounded-full border-2 animate-spin"
                  style={{ borderColor: `${GOLD} transparent ${GOLD} ${GOLD}` }}
                />
                <p className="text-xs" style={{ color: GOLD_DIM }}>
                  Loading globe…
                </p>
              </div>
            </div>
          )}

          <div
            ref={containerRef}
            className="w-full h-full"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
          />

          {tooltip.visible && (
            <div
              className="absolute pointer-events-none z-20 text-xs rounded-lg px-3 py-1.5"
              style={{
                left: tooltip.x,
                top: tooltip.y,
                background: "rgba(5,26,20,0.95)",
                border: `1px solid ${GOLD}`,
                color: "#f5e6b3",
                fontFamily: "sans-serif",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
              }}
            >
              {tooltip.text}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}