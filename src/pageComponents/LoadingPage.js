"use client";

import styled, { css } from "styled-components";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { ads } from "@/data/images";

const ViewportContainer = styled.section`
  width: 100vw;
  height: 100vh;
`;

const LoadingContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 5%;
`;

const LoadingIconContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SkipLoadingButton = styled.button`
  transition: opacity 2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: none;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }
`;

const AdImage = styled.img`
  ${(props) => {
    return css`
      position: absolute;
      width: ${props.$width};
      margin-top: ${props.$marginTop};
      margin-left: ${props.$marginLeft};
    `;
  }}

  &:hover {
    cursor: pointer;
  }
`;

const LoadingPage = () => {
  const [adImageData, setAdImageData] = useState([]);

  const createAd = () => {
    const randomAdKey =
      Object.keys(ads)[Math.floor(Math.random() * Object.keys(ads).length)];
    const adImage = {
      key: randomAdKey,
      file: ads[randomAdKey]["file"],
      width: Math.random() * 10 + 5 + "%",
      marginTop: Math.random() * 40 + "%",
      marginLeft: Math.random() * 85 + "%",
    };
    setAdImageData([...adImageData, adImage]);
  };

  const clickAd = (index) => {
    const adImageDataCopy = [...adImageData];
    adImageDataCopy.splice(index, 1);
    setAdImageData(adImageDataCopy);
  };

  return (
    <ViewportContainer>
      {adImageData.map((ad, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              clickAd(index);
            }}
          >
            <AdImage
              alt={ad["key"]}
              src={ad["file"]}
              $width={ad["width"]}
              $marginTop={ad["marginTop"]}
              $marginLeft={ad["marginLeft"]}
            />
          </div>
        );
      })}
      <LoadingContainer>
        <LoadingIconContainer>
          <Icon icon="line-md:loading-loop" width="100px" height="100px" />
          <h1>Loading...</h1>
        </LoadingIconContainer>
        <SkipLoadingButton onClick={createAd}>
          Skip
          <Icon
            icon="material-symbols-light:skip-next-outline"
            width="20px"
            height="20px"
          />
        </SkipLoadingButton>
      </LoadingContainer>
    </ViewportContainer>
  );
};

export default LoadingPage;
