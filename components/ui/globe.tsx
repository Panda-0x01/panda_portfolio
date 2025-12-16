"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface GlobeProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Globe({ className = "", width = 300, height = 300 }: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const globeRef = useRef<THREE.Group | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Clear any existing content
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // Create globe group
    const globeGroup = new THREE.Group();
    globeRef.current = globeGroup;
    scene.add(globeGroup);

    // Create main globe sphere
    const globeGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.1,
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globeMesh);
    // Create wireframe
    const wireframeGeometry = new THREE.SphereGeometry(1.21, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globeGroup.add(wireframeMesh);

    // Create latitude lines
    for (let i = 0; i < 8; i++) {
      const lat = (i / 7 - 0.5) * Math.PI;
      const radius = Math.cos(lat) * 1.2;
      const y = Math.sin(lat) * 1.2;
      
      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        0, 2 * Math.PI,
        false,
        0
      );
      
      const points = curve.getPoints(64);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.2 
      });
      const line = new THREE.Line(geometry, material);
      line.position.y = y;
      line.rotation.x = Math.PI / 2;
      globeGroup.add(line);
    }
    // Create longitude lines
    for (let i = 0; i < 16; i++) {
      const lng = (i / 16) * Math.PI * 2;
      const points = [];
      
      for (let j = 0; j <= 64; j++) {
        const lat = (j / 64 - 0.5) * Math.PI;
        const x = Math.cos(lat) * Math.cos(lng) * 1.2;
        const y = Math.sin(lat) * 1.2;
        const z = Math.cos(lat) * Math.sin(lng) * 1.2;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.2 
      });
      const line = new THREE.Line(geometry, material);
      globeGroup.add(line);
    }

    // Helper function to convert lat/lng to 3D coordinates
    function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      
      return new THREE.Vector3(x, y, z);
    }
    // Create connection arcs (sample data)
    const connections = [
      { start: [37.7749, -122.4194], end: [51.5074, -0.1278] }, // SF to London
      { start: [40.7128, -74.0060], end: [35.6762, 139.6503] }, // NYC to Tokyo
      { start: [52.5200, 13.4050], end: [-33.8688, 151.2093] }, // Berlin to Sydney
      { start: [55.7558, 37.6176], end: [-22.9068, -43.1729] }, // Moscow to Rio
    ];

    connections.forEach(({ start, end }) => {
      const startVec = latLngToVector3(start[0], start[1], 1.25);
      const endVec = latLngToVector3(end[0], end[1], 1.25);
      
      // Create arc
      const distance = startVec.distanceTo(endVec);
      const midPoint = new THREE.Vector3()
        .addVectors(startVec, endVec)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(1.25 + distance * 0.3);
      
      const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
      const points = curve.getPoints(32);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x00ff88, 
        transparent: true, 
        opacity: 0.6,
      });
      const line = new THREE.Line(geometry, material);
      globeGroup.add(line);
    });
    // Create city points
    const cities = [
      [37.7749, -122.4194], // San Francisco
      [40.7128, -74.0060],  // New York
      [51.5074, -0.1278],   // London
      [35.6762, 139.6503],  // Tokyo
      [52.5200, 13.4050],   // Berlin
      [-33.8688, 151.2093], // Sydney
      [55.7558, 37.6176],   // Moscow
      [-22.9068, -43.1729], // Rio de Janeiro
    ];

    cities.forEach(([lat, lng]) => {
      const position = latLngToVector3(lat, lng, 1.25);
      const pointGeometry = new THREE.SphereGeometry(0.02, 8, 8);
      const pointMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        transparent: true,
        opacity: 0.8
      });
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.copy(position);
      globeGroup.add(point);

      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(0.04, 8, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(position);
      globeGroup.add(glow);
    });

    // Set loaded state after a brief delay to avoid synchronous setState
    setTimeout(() => setIsLoaded(true), 0);
    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.003;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of all geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mountRef} 
        className="globe-container"
        style={{ width, height }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/50 text-sm">Loading globe...</div>
        </div>
      )}
    </div>
  );
}