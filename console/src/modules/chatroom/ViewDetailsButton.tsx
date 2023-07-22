import { Button } from "@mui/material";

interface ViewDetailsButtonProps {
  onClick: () => void;
}

const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      View Details
    </Button>
  );
};

export default ViewDetailsButton;
