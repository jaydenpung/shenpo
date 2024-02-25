import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { AdditiveBlending } from 'three';

const Galaxy = () => {
  const textureLoader = new THREE.TextureLoader();
  const scene = new THREE.Scene();
  const clock = new THREE.Clock();

  const shape = textureLoader.load('/particleShape/1.png');
  const canvasRef = useRef(null);

  let bgStarsGeometry: any = null;
  let bgStarsMaterial: any = null;
  let bgStars: any = null;

  const parameters = {
    count: 70000,
    size: 0.01,
    radius: 5,
    branches: 8,
    spin: 1,
    randomness: 0.3,
    randomnessPower: 5,
    stars: 9000,
    starColor: '#1b3984',
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
  };

  const generateBgStars = () => {
    if (bgStars !== null) {
      bgStarsGeometry.dispose();
      bgStarsMaterial.dispose();
      scene.remove(bgStars);
    }

    bgStarsGeometry = new THREE.BufferGeometry();
    const bgStarsPositions = new Float32Array(parameters.stars * 3);

    for (let j = 0; j < parameters.stars; j++) {
      bgStarsPositions[j * 3 + 0] = (Math.random() - 0.5) * 20;
      bgStarsPositions[j * 3 + 1] = (Math.random() - 0.5) * 20;
      bgStarsPositions[j * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    bgStarsGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(bgStarsPositions, 3),
    );

    bgStarsMaterial = new THREE.PointsMaterial({
      size: parameters.size,
      depthWrite: false,
      sizeAttenuation: true,
      blending: AdditiveBlending,
      color: parameters.starColor ?? 'white',
      transparent: true,
      alphaMap: shape,
    });

    bgStars = new THREE.Points(bgStarsGeometry, bgStarsMaterial);

    scene.add(bgStars);
  };

  let geometry: any = null;
  let material: any = null;
  let points: any = null;

  const generateGalaxy = () => {
    if (points !== null) {
      geometry.dispose();
      material.dispose();
      scene.remove(points);
    }

    geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      //Position
      const x = Math.random() * parameters.radius;
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * 2 * Math.PI;
      const spinAngle = x * parameters.spin;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1);
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1);
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1);

      positions[i * 3] = Math.sin(branchAngle + spinAngle) * x + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.cos(branchAngle + spinAngle) * x + randomZ;

      //Color

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, x / parameters.radius);

      colors[i * 3 + 0] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({
      color: 'white',
      size: parameters.size,
      depthWrite: false,
      sizeAttenuation: true,
      blending: AdditiveBlending,
      vertexColors: true,
      transparent: true,
      alphaMap: shape,
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);
  };

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  useEffect(() => {
    setTimeout(() => {
      // Canvas
      const canvas = canvasRef.current;

      if (!canvas) return null;

      //Galaxy Generator

      //Background stars
      generateBgStars();
      generateGalaxy();

      /**
       * Sizes
       */

      window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100,
      );
      camera.position.x = 3;
      camera.position.y = 3;
      camera.position.z = 3;
      scene.add(camera);

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * Animate
       */

      const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        //Update the camera
        points.rotation.y = elapsedTime * 0.3;
        bgStars.rotation.y = -elapsedTime * 0.05;

        // Update controls
        controls.update();

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();
    }, 200);
  }, []);

  return (
    <Canvas ref={canvasRef}>
      <></>
    </Canvas>
  );
};

export default Galaxy;
