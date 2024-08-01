import {
  AD_MIDPOINT_ANGLE,
  INNER_AD_RADIUS,
  MID_AD_RADIUS,
  OUTER_AD_RADIUS,
  PRODUCT_RADIUS,
  VERTICAL_AD_RANGE,
} from "@/data/constants";

export const randomProductPositionXZCoordinate = () => {
  const random = Math.random();
  return random > 0.5 ? random * PRODUCT_RADIUS : random * -PRODUCT_RADIUS;
};

export const randomProductPositionYCoordinate = () => {
  const random = Math.random();
  return random > 0.5 ? random * 7 : random * 2;
};

export const randomProductPosition = () => {
  return [
    randomProductPositionXZCoordinate(),
    randomProductPositionYCoordinate(),
    randomProductPositionXZCoordinate(),
  ];
};

export const randomProductRotationCoordinate = () => {
  return Math.random() * Math.PI * 2;
};

export const randomProductRotation = () => {
  return [
    randomProductRotationCoordinate(),
    randomProductRotationCoordinate(),
    randomProductRotationCoordinate(),
  ];
};

export const randomAdPositionYCoordinate = () => {
  const random = Math.random();
  return random > 0.5
    ? random * VERTICAL_AD_RANGE
    : random * -VERTICAL_AD_RANGE;
};

// 0, +-radius or +-midpoint
export const randomAdPositionXCoordinate = (radius) => {
  const sign = Math.random() > 0.5 ? 1 : -1;
  const random = Math.random();
  return random < 0.2
    ? 0
    : random < 0.6
    ? radius * sign
    : radius * AD_MIDPOINT_ANGLE * sign;
};

export const randomAdPositionZCoordinate = (radius, xCoordinate) => {
  if (Math.abs(xCoordinate) === Math.abs(radius)) {
    return 0;
  }
  const sign = Math.random() > 0.5 ? 1 : -1;
  return xCoordinate === 0 ? radius * sign : radius * AD_MIDPOINT_ANGLE * sign;
};

export const randomAdPosition = () => {
  const radii = [INNER_AD_RADIUS, MID_AD_RADIUS, OUTER_AD_RADIUS];
  const radius = radii[Math.floor(Math.random() * 3)];
  const xCoordinate = randomAdPositionXCoordinate(radius);
  return [
    xCoordinate,
    randomAdPositionYCoordinate(),
    randomAdPositionZCoordinate(radius, xCoordinate),
  ];
};

// if x is +-radius, z is 0 --> y rotation is 0
// if x is 0, z is +-radius --> y is Math.PI / 2
// if x and z are both the same midpoint --> y rotation is -Math.PI / 4
// if x and z are diff midpoint --> y rotation is Math.PI / 4
export const randomAdRotation = (position) => {
  const xCoordinate = position[0];
  const zCoordinate = position[2];

  let y = 0;
  if (xCoordinate === zCoordinate) {
    y = -Math.PI / 4;
  } else if (Math.abs(xCoordinate) === Math.abs(zCoordinate)) {
    y = Math.PI / 4;
  } else if (xCoordinate === 0) {
    y = Math.PI / 2;
  }

  return [0, y, 0];
};

export const randomAdPositionRotation = () => {
  const position = randomAdPosition();
  return { position: position, rotation: randomAdRotation(position) };
};

// range from 10% to 30%
export const randomAdImageWidth = () => {
  return Math.random() * 20 + 10 + "%";
};

// range between -40vh to 180vh
export const randomAdImageMarginTop = () => {
  return Math.random() * 220 - 40 + "vh";
};

// range from 0% to 62%
export const randomAdImageMarginLeft = () => {
  return Math.random() * 62 + "%";
};

export const randomBoxSize = () => {
  return [Math.random() * 2 + 1, Math.random() * 2 + 1, Math.random() * 2 + 1];
};
