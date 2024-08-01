import { ads } from "@/data/images";
import {
  randomAdImageWidth,
  randomAdImageMarginTop,
  randomAdImageMarginLeft,
} from "@/utils/helpers";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Jabber from "jabber";
import { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { music } from "@/data/sound";

const ResultsBackground = styled.section`
  width: 100vw;
  height: 200vh;
  background: linear-gradient(#ffffff, #121212);
  padding: 5%;
`;

const ResultsText = styled.section`
  position: absolute;
  margin-top: -40vh;
  padding-right: 5%;
  font-size: clamp(1rem, calc(1.1vw + 1vh), 6rem);
  color: #121212;
  font-family: "Inter";
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
`;

const SearchResults = ({ searchValue }) => {
  const randomMusicFile = () => {
    return music[Math.floor(Math.random() * music.length)];
  };

  const [visible, setVisible] = useState(false);
  const [musicFile, setMusicFile] = useState(randomMusicFile());
  const [canPlayMusic, setCanPlayMusic] = useState(false);
  const scrollData = useScroll();
  const musicRef = useRef();

  useFrame(() => {
    setVisible(scrollData.offset > 0.01);
  });

  useEffect(() => {
    if (visible && canPlayMusic) {
      musicRef.current.play();
    } else {
      musicRef.current.pause();
    }
  }, [visible, canPlayMusic]);

  const updateMusic = () => {
    setMusicFile(randomMusicFile());
    musicRef.current.load();
  };

  const themeWords = [
    searchValue,
    "DON'T MISS OUT",
    "BUY NOW",
    "LIMITED EDITION",
    "WHILE STOCKS LAST",
    "AVAILABLE NOW",
    "CLICK HERE",
    "FIND OUT MORE",
    "JOIN US",
  ];

  const jabberSearchWord = new Jabber([searchValue], 3);
  const jabberMix = new Jabber(themeWords, 4);
  const jabberAds = new Jabber(themeWords, 1);

  return (
    <ResultsBackground
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <audio
        ref={musicRef}
        src={musicFile}
        onEnded={updateMusic}
        onLoadStart={() => setCanPlayMusic(false)}
        onCanPlayThrough={() => {
          setCanPlayMusic(true);
        }}
      />
      <ResultsText>
        <p>{jabberSearchWord.createParagraph(150)}</p>
        <p>{jabberMix.createParagraph(150)}</p>
        <p>{jabberAds.createParagraph(200)}</p>
      </ResultsText>
      {visible &&
        Object.keys(ads).map((key, index) => {
          return (
            <div key={index}>
              <AdImage
                alt={key}
                src={ads[key]["file"]}
                $width={randomAdImageWidth()}
                $marginTop={randomAdImageMarginTop()}
                $marginLeft={randomAdImageMarginLeft()}
              />
            </div>
          );
        })}
    </ResultsBackground>
  );
};

export default SearchResults;
