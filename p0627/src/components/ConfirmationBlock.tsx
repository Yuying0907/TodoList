import { Button } from "@chakra-ui/react";

interface ConfirmationBlockProps {
    onConfirmed: () => void;
    onCencel: () => void;
    onSelected: (yn:boolean) => void;
}

export const ConfirmationBlock = ({onConfirmed, onCencel, onSelected}: ConfirmationBlockProps) => {
  return (
    <>
      <div>
          <Button
            onClick={()=>{
              onConfirmed();
              onSelected(true);
            }}>  
          確定</Button>

          <Button
            onClick={()=>{
              onCencel();
              onSelected(false);
            }}>
          取消</Button>
      </div>
    </>
  );
};
