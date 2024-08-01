import { Icon } from "@iconify/react";
import styled, { createGlobalStyle } from "styled-components";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useRef, useState } from "react";
import SearchResults from "@/components/SearchResults";
import InstructionReceipt from "@/components/InstructionReceipt";

const Font = createGlobalStyle`
  @font-face {
    font-family: "Inter";
    src: local("Inter"), url('/Inter-VariableFont_slnt,wght.ttf') format("truetype");
  }

  * {
    box-sizing: border-box;
  }
`;

const SearchBackground = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 10%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Inter";
`;

const InstructionsBackground = styled.section`
  width: 100vw;
  height: 150vh;
  padding-top: 50%;
  padding-left: 5%;
  display: grid;
  align-items: start;
  justify-content: start;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: clamp(3rem, 5vw, 13rem);
  font-weight: 400;
  margin: 0;
`;

const Subheading = styled.h2`
  text-align: center;
  font-size: clamp(2rem, 3.5vw, 9.5rem);
  font-weight: 350;
  margin-top: 0;
  color: #d9d9d9;
`;

const SearchBarWrapper = styled.div`
  border-color: #d9d9d9;
  border-style: solid;
  border-radius: 100px;
  border-width: 4px;
  width: max(300px, 60%);
  height: max(55px, 4vw);
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  column-gap: 15px;
  scroll-margin-top: 50px;
`;

const SearchBarIcon = styled.button`
  border: none;
  padding: 0;
  background-color: transparent;

  min-width: 30px;
  height: 100%;
  display: grid;
  place-items: center;

  %:hover {
    cursor: pointer;
  }
`;

const SearchBarInput = styled.input`
  border: none;
  background-color: transparent;
  font-size: clamp(1.5rem, 2vw, 8rem);
  width: 100%;
  text-overflow: ellipsis;

  &::placeholder {
    color: #d9d9d9;
  }

  &:focus {
    outline: none;
  }
`;

const SearchPage = () => {
  const [pages, setPages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const searchRef = useRef();

  const search = (event) => {
    if (event.target.value) {
      setSearchValue(event.target.value);
      setPages(6);
      setScrollEnabled(true);
      setTimeout(() => {
        searchRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }, 5);
    }
  };

  return (
    <ScrollControls
      pages={pages}
      style={{ overflow: scrollEnabled ? "auto" : "hidden" }}
    >
      <Scroll html>
        <Font />
        <SearchBackground
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Heading>Welcome back online!</Heading>
          <Subheading>We missed you.</Subheading>
          <SearchBarWrapper ref={searchRef}>
            <SearchBarIcon onClick={search}>
              <Icon
                icon="material-symbols:search-rounded"
                color="#d9d9d9"
                width="100%"
                height="75%"
              />
            </SearchBarIcon>
            <SearchBarInput
              type="text"
              placeholder="What would you like to see?"
              maxLength={20}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  search(event);
                }
              }}
            />
          </SearchBarWrapper>
        </SearchBackground>
        {scrollEnabled && <SearchResults searchValue={searchValue} />}
        <InstructionsBackground>
          <InstructionReceipt />
        </InstructionsBackground>
      </Scroll>
    </ScrollControls>
  );
};

export default SearchPage;
