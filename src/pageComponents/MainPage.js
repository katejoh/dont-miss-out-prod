"use client";

import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  SpotLight,
  Sparkles,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import GroundPlane from "@/components/GroundPlane";
import StarterProducts from "@/components/StarterProducts";
import StarterAds from "@/components/StarterAds";
import { CAMERA_POSITION } from "@/data/constants";
import SearchPage from "@/pageComponents/SearchPage";
import WebcamAd from "@/components/WebcamAd";

const ViewportContainer = styled.section`
  width: 100vw;
  height: 100vh;
`;

const MainPage = () => {
  return (
    <ViewportContainer>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[CAMERA_POSITION, 0, 0]} />
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
        <color attach="background" args={["#121212"]} />

        <SearchPage />
        <Sparkles
          count={300}
          size={3}
          speed={1}
          opacity={1}
          scale={25}
          color="#fff3b0"
        />

        <SpotLight
          position={[0, 10, 0]}
          distance={20}
          angle={0.5}
          attenuation={15}
          intensity={500}
          anglePower={5}
          castShadow
          shadow-bias={-0.003}
        />
        <Physics>
          <GroundPlane />
          <StarterProducts />
          <StarterAds />
          <WebcamAd />
        </Physics>
      </Canvas>
    </ViewportContainer>
  );
};

export default MainPage;
