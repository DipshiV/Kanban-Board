import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DescriptionBox from "./DescriptionBox";

const DescriptionPage = () => {
  const { cardId } = useParams();

  // Access the cardData from the Redux store
  const listData = useSelector((state) => state.list.list);
  const cardData = findCardData(listData, cardId);
  console.log('listdata',listData)
  console.log('cardData',cardData)

  if (!cardData) {
    return <div>No card found.</div>;
  }

  return <DescriptionBox cardData={cardData} />;
};

export default DescriptionPage;

// Helper function to find cardData in the listData array
const findCardData = (listData, cardId) => {
  for (const listItem of listData) {
    if (listItem.children) {
      for (const child of listItem.children) {
        if (child.id === cardId) {
          return child;
        }
      }
    }
  }
  return null;

};
