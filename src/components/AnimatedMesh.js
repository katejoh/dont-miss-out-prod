import { useState } from "react";
import { useSpring, animated } from "@react-spring/three";

const AnimatedMesh = ({
  onClick,
  castShadow,
  receiveShadow,
  geometry,
  material,
  position,
  rotation,
  pressedScale,
  hoverScale,
  defaultScale,
  visible,
  children,
}) => {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const { scale } = useSpring({
    scale: pressed
      ? pressedScale
      : hover
      ? hoverScale
      : visible
      ? defaultScale
      : 0,
  });

  return (
    <animated.mesh
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHover(true);
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        setHover(false);
        setPressed(false);
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        setPressed(true);
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        setPressed(false);
      }}
      onClick={onClick}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      scale={scale}
      geometry={geometry}
      material={material}
      position={position}
      rotation={rotation}
    >
      {children}
    </animated.mesh>
  );
};

export default AnimatedMesh;
