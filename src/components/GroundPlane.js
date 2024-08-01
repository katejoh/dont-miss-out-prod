import { Circle } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

const GroundPlane = () => {
  return (
    <RigidBody gravityScale={0}>
      <Circle args={[5, 32]} position={[0, -3.5, 0]} rotation-x={Math.PI / 2} />
    </RigidBody>
  );
};

export default GroundPlane;
