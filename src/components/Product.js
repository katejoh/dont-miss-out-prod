import { useState, useRef } from "react";
import { products } from "@/data/models";
import { PositionalAudio, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import AnimatedMesh from "@/components/AnimatedMesh";

const Product = ({ product, position, rotation }) => {
  const [clicked, setClicked] = useState(false);
  const soundRef = useRef();
  const productName = product;
  const productData = products[productName];
  const { nodes, materials } = useGLTF(productData["file"]);

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
            geometry={nodes[productName]["geometry"]}
            material={materials[productData["material"]]}
            position={position}
            rotation={rotation}
            pressedScale={0.0075}
            hoverScale={0.01}
            defaultScale={0.009}
            visible
          />
        </RigidBody>
      )}
    </>
  );
};

export default Product;
