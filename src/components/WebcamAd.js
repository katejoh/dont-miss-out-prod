import { VERTICAL_AD_RANGE } from "@/data/constants";
import AnimatedMesh from "./AnimatedMesh";
import { useVideoTexture, Float, PositionalAudio } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import {
  randomAdPositionRotation,
  randomBoxSize,
  randomProductPosition,
  randomProductRotation,
} from "@/utils/helpers";
import WebcamProduct from "./WebcamProduct";
import { adSoundEffects } from "@/data/sound";

const WebcamAd = ({ geometry, position, rotation }) => {
  const [stream, setStream] = useState();
  const [copies, setCopies] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const soundRef = useRef();

  function VideoMaterial({ src }) {
    const texture = useVideoTexture(src);
    return <meshBasicMaterial map={texture} toneMapped={false} />;
  }

  useEffect(() => {
    const getWebcamStream = async () => {
      setStream(await navigator.mediaDevices.getUserMedia({ video: true }));
    };

    getWebcamStream();
  }, []);

  const webcamMaterial = () => {
    return (
      <Suspense fallback={<meshBasicMaterial wireframe />}>
        <VideoMaterial src={stream} />
      </Suspense>
    );
  };

  const createWebcamProduct = () => {
    const productsDataCopy = [...productsData];
    const newProductData = {
      position: randomProductPosition(),
      rotation: randomProductRotation(),
      boxSize: randomBoxSize(),
    };
    productsDataCopy.push(newProductData);
    setProductsData(productsDataCopy);
  };

  const clickWebcamAd = (event) => {
    event.stopPropagation();
    playSound();
    createWebcamProduct();
    if (Math.random() < 0.2) {
      createCopy();
    }
  };

  const createCopy = () => {
    setCopies([...copies, duplicateAd()]);
  };

  const duplicateAd = () => {
    const positionRotation = randomAdPositionRotation();
    return (
      <WebcamAd
        key={copies.length}
        geometry={geometry}
        position={positionRotation["position"]}
        rotation={positionRotation["rotation"]}
      />
    );
  };

  const playSound = () => {
    if (!soundRef.current.isPlaying) {
      soundRef.current.play();
      setTimeout(() => {
        soundRef.current.stop();
      }, 700);
    }
  };

  return (
    <>
      {copies}
      <PositionalAudio
        ref={soundRef}
        url={adSoundEffects[Math.floor(Math.random() * adSoundEffects.length)]}
        distance={10}
      />
      <Float
        speed={1}
        rotationIntensity={1}
        floatingRange={[-VERTICAL_AD_RANGE, VERTICAL_AD_RANGE]}
      >
        <AnimatedMesh
          onClick={clickWebcamAd}
          geometry={geometry}
          position={position}
          rotation={
            rotation !== undefined ? [0, rotation[1], Math.PI] : rotation
          }
          pressedScale={0.013}
          hoverScale={0.02}
          defaultScale={0.015}
          visible={true}
        >
          {webcamMaterial()}
        </AnimatedMesh>
      </Float>
      {productsData.map((product, index) => {
        return (
          <WebcamProduct
            key={index}
            position={product["position"]}
            rotation={product["rotation"]}
            boxSize={product["boxSize"]}
          >
            {webcamMaterial()}
          </WebcamProduct>
        );
      })}
    </>
  );
};

export default WebcamAd;
