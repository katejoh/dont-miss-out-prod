import { ads } from "@/data/models";
import { randomAdPositionRotation } from "@/utils/helpers";
import Ad from "@/components/Ad";
import { useState, useEffect, useRef } from "react";
import { PositionalAudio } from "@react-three/drei";
import SaleText from "@/components/SaleText";

const StarterAds = () => {
  const [sale, setSale] = useState(false);
  const [saleAd, setSaleAd] = useState("");

  const soundRef = useRef();
  const adKeys = Object.keys(ads);

  const playSound = () => {
    if (!soundRef.current.isPlaying) {
      soundRef.current.play();
      setTimeout(() => {
        soundRef.current?.stop();
      }, 2000);
    }
  };

  useEffect(() => {
    const toggleSale = setInterval(() => {
      const saleChance = Math.random() < 0.3;
      if (saleChance) {
        const randomIndex = Math.floor(Math.random() * adKeys.length);
        setSale(true);
        setSaleAd(adKeys[randomIndex]);
        playSound();
      } else if (sale) {
        setSale(false);
      }
    }, Math.random() * 20000 + 10000);

    return () => clearInterval(toggleSale);
  }, [sale]);

  return (
    <>
      <PositionalAudio
        ref={soundRef}
        url={"/sound/soundEffects/On Sale.mp3"}
        distance={10}
      />
      {Object.keys(ads).map((key, index) => {
        const positionRotation1 = randomAdPositionRotation();
        const positionRotation2 = randomAdPositionRotation();
        const double = Math.random() < 0.5;
        return (
          <group key={index}>
            {sale ? <SaleText /> : <></>}
            <Ad
              ad={sale ? saleAd : key}
              position={positionRotation1["position"]}
              rotation={positionRotation1["rotation"]}
            />
            {double && (
              <Ad
                ad={sale ? saleAd : key}
                position={positionRotation2["position"]}
                rotation={positionRotation2["rotation"]}
              />
            )}
          </group>
        );
      })}
    </>
  );
};

export default StarterAds;
