import { Button } from "@mui/material";
import { CSSProperties } from "react";
interface Props {
  size: string | any;
  style?: CSSProperties;
}

const OutOfStockButton = (props: Props) => {
  return (
    <Button
      disabled
      size={props.size}
      variant="contained"
      style={{ ...props.style, backgroundColor: "#CAC2B9" }}
    >
      Not in stock
    </Button>
  );
};

export default OutOfStockButton;
