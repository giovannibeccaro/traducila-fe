import React from "react";

type Props = {
  color: string;
};

const SearchIcon: React.FC<Props> = ({ color }) => {
  return (
    <>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.8467 17.1851L22.0003 22.5442"
          stroke={color}
          strokeWidth=".25rem"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.4064 18.9706C14.913 18.9706 18.5663 15.1716 18.5663 10.4853C18.5663 5.799 14.913 2 10.4064 2C5.89987 2 2.24658 5.799 2.24658 10.4853C2.24658 15.1716 5.89987 18.9706 10.4064 18.9706Z"
          stroke={color}
          strokeWidth=".25rem"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default SearchIcon;
