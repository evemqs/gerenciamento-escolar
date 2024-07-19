import React from "react";
import "../Button/App.css";

const Button = ({ Text, onClick, Type = "button" }) => {
  return (
    <Button type={Type} onClick={onClick}> {Text} </Button>
  );
};

export default Button;