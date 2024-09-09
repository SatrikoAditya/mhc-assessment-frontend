import React from "react";

interface Section {
  children: React.ReactNode;
}

const Section: React.FC<Section> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-10">{children}</div>
    </div>
  );
};

export default Section;
