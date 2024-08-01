import { useState, useRef } from "react";
import { PositionalAudio } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import AnimatedMesh from "@/components/AnimatedMesh";

const WebcamProduct = ({ position, rotation, boxSize, children }) => {
  const [clicked, setClicked] = useState(false);
  const soundRef = useRef();

  const playSound = () => {
    if (!soundRef.current.isPlaying) {
      soundRef.current.play();
    }
  };

  const clickProduct = (event) => {
    event.stopPropagation();
    playSound();
    setClicked(true);
  };

  return (
    <>
      <PositionalAudio
        ref={soundRef}
        url={"/sound/soundEffects/Recycle.mp3"}
        loop={false}
        setVolume={0.3}
        distance={5}
      />
      {clicked ? (
        <></>
      ) : (
        <RigidBody colliders="hull">
          <AnimatedMesh
            onClick={clickProduct}
            castShadow
            receiveShadow
            position={position}
            rotation={rotation}
            pressedScale={0.8}
            hoverScale={1.2}
            defaultScale={1}
            visible
          >
            <boxGeometry args={boxSize} />
            {children}
          </AnimatedMesh>
        </RigidBody>
      )}
    </>
  );
};

export default WebcamProduct;
