import { useState } from "react";

const ToggleRow = ({ renderRow }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return renderRow(isCollapsed, setIsCollapsed);
};
export default ToggleRow;
