import styled from "styled-components";

const ReceiptBackground = styled.section`
  min-height: 600px;
  width: auto;
  min-width: 320px;
  padding: 10%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  &&& {
    font-family: "Courier New", monospace;
  }
`;

const ReceiptTitle = styled.h3`
  text-align: center;
  font-size: clamp(2rem, 2.5vw, 3rem);
  margin-bottom: 10px;
`;

const ReceiptSubheading = styled.h5`
  text-align: center;
  margin: 0;
`;

const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;
`;

const InstructionRow = styled.div`
  display: flex;
  column-gap: 5%;
  font-size: clamp(1.1rem, 1.3vw, 1.5rem);
`;

const Instruction = styled.p`
  margin: 0;
  overflow-wrap: anywhere;
  flex: 2;
`;

const Quantity = styled.p`
  margin: 0;
  flex: 0.5;
`;

const Price = styled.p`
  margin: 0;
  overflow-wrap: anywhere;
  flex: 3;
`;

const Divider = styled.div`
  margin: 10% 0 10% 0;
  width: 80%;
  border-width: thin;
  border-style: dashed;
  opacity: 0.7;
  align-self: center;
`;

const InstructionReceipt = () => {
  const getDate = () => {
    const date = new Date();

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const getTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  const receiptText = [
    { instruction: "BROWSE", price: "$DRAG.SIDEWAYS" },
    { instruction: "ADD TO CART", price: "$CLICK.AD" },
    { instruction: "CHECKOUT", price: "$CLICK.PRODUCT" },
    { instruction: "HIDE RECEIPT", price: "$SCROLL.DOWN" },
  ];

  return (
    <ReceiptBackground>
      <ReceiptTitle>DON'T MISS OUT</ReceiptTitle>
      <ReceiptSubheading>
        Thank you for coming back online on {getDate()} at {getTime()}
      </ReceiptSubheading>
      <ReceiptSubheading>Located on all devices near you</ReceiptSubheading>
      <InstructionsContainer>
        <Divider />
        {receiptText.map((text, index) => {
          return (
            <InstructionRow key={index}>
              <Instruction>{text["instruction"]}</Instruction>
              <Quantity>1</Quantity>
              <Price>{text["price"]}</Price>
            </InstructionRow>
          );
        })}
        <Divider />
        <InstructionRow>
          <Instruction>TOTALS:</Instruction>
          <Quantity>4</Quantity>
          <Price>$YOUR.ATTENTION</Price>
        </InstructionRow>
      </InstructionsContainer>
    </ReceiptBackground>
  );
};

export default InstructionReceipt;
