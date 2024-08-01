import { useEffect, useState, useRef } from "react";
import { ads } from "@/data/models";
import { adSoundEffects } from "@/data/sound";
import { Float, PositionalAudio, useGLTF } from "@react-three/drei";
import Product from "@/components/Product";
import {
  randomAdPositionRotation,
  randomProductPosition,
  randomProductRotation,
} from "@/utils/helpers";
import AnimatedMesh from "@/components/AnimatedMesh";
import { VERTICAL_AD_RANGE } from "@/data/constants";
import WebcamAd from "./WebcamAd";

const Ad = ({ ad, position, rotation }) => {
  const [visible, setVisible] = useState(Math.random() > 0.5);
  const [productsData, setProductsData] = useState([]);
  const [copies, setCopies] = useState([]);
  const [webcamAds, setWebcamAds] = useState([]);
  const soundRef = useRef();

  const createProduct = () => {
    const productsDataCopy = [...productsData];
    const newProductData = {
      position: randomProductPosition(),
      rotation: randomProductRotation(),
    };
    productsDataCopy.push(newProductData);
    setProductsData(productsDataCopy);
  };

  const createCopy = () => {
    setCopies([...copies, duplicateAd()]);
  };

  const duplicateAd = () => {
    const positionRotation = randomAdPositionRotation();
    return (
      <Ad
        key={copies.length}
        ad={ad}
        position={positionRotation["position"]}
        rotation={positionRotation["rotation"]}
      />
    );
  };

  const newWebcamAd = () => {
    const positionRotation = randomAdPositionRotation();
    return (
      <WebcamAd
        key={webcamAds.length}
        geometry={nodes[adName]["geometry"]}
        position={positionRotation["position"]}
        rotation={positionRotation["rotation"]}
      />
    );
  };

  const createWebcamAd = () => {
    setWebcamAds([...webcamAds, newWebcamAd()]);
  };

  const playSound = () => {
    if (!soundRef.current.isPlaying) {
      soundRef.current.play();
      setTimeout(() => {
        soundRef.current.stop();
      }, 700);
    }
  };

  const clickAd = (event) => {
    event.stopPropagation();
    playSound();
    createProduct();
    if (Math.random() < 0.2) {
      createCopy();
    } else if (Math.random() < 0.2) {
      createWebcamAd();
    }
  };

  useEffect(() => {
    const toggleVisibility = setInterval(() => {
      setVisible(Math.random() > 0.5);
    }, Math.random() * 10000 + 5000);

    return () => clearInterval(toggleVisibility);
  }, [visible]);

  const adName = ad;
  const adData = ads[adName];
  const { nodes, materials } = useGLTF(adData["file"]);

  return (
    <>
      {copies}
      {webcamAds}
      <Float
        speed={1}
        rotationIntensity={1}
        floatingRange={[-VERTICAL_AD_RANGE, VERTICAL_AD_RANGE]}
      >
        <AnimatedMesh
          onClick={clickAd}
          geometry={nodes[adName]["geometry"]}
          material={materials[adData["material"]]}
          position={position}
          rotation={rotation}
          pressedScale={0.013}
          hoverScale={0.02}
          defaultScale={0.015}
          visible={visible}
        />
        <PositionalAudio
          ref={soundRef}
          url={
            adSoundEffects[Math.floor(Math.random() * adSoundEffects.length)]
          }
          distance={10}
        />
      </Float>
      {productsData.map((product, index) => {
        return (
          <Product
            key={index}
            product={adData["product"]}
            position={product["position"]}
            rotation={product["rotation"]}
          />
        );
      })}
    </>
  );
};

export default Ad;
