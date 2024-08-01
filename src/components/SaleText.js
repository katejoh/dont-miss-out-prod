import { randomAdPositionRotation } from "@/utils/helpers";
import { Text3D, Float } from "@react-three/drei";

const SaleText = () => {
  const positionRotation = randomAdPositionRotation();
  const rotation = [...positionRotation["rotation"]];
  rotation[1] = rotation[1] + Math.PI / 2;

  return (
    <Float speed={5}>
      <Text3D
        position={positionRotation["position"]}
        rotation={rotation}
        font={"/Inter_Regular.json"}
        bevelEnabled
        bevelSize={0.05}
        height={0.5}
      >
        SALE
        <meshNormalMaterial wireframe={Math.random() > 0.5} />
      </Text3D>
    </Float>
  );
};

export default SaleText;
