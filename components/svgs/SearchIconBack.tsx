import React from "react";

type Props = {
  color: string;
};

const SearchIconBack: React.FC<Props> = ({ color }) => {
  return (
    <svg
      width="29"
      height="26"
      viewBox="0 0 29 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9375 24H18.7969C20.9725 24 23.059 23.1308 24.5974 21.5836C26.1357 20.0365 27 17.938 27 15.75C27 13.562 26.1357 11.4635 24.5974 9.91637C23.059 8.36919 20.9725 7.5 18.7969 7.5H3.5625M7.46875 2L2 7.5L7.46875 13"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIconBack;
