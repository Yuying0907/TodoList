import { useState } from "react";
import { ITodo } from "../interfaces/ITodo";
import {
  Tr,
  Td,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
} from "@chakra-ui/react";
import { ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { ConfirmationBlock } from "./ConfirmationBlock";

interface TodoItemProps {
  todo: ITodo;
  onDelete:(todo: ITodo) => void
}

export const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  const [item, setItem] = useState<ITodo>(todo);
  const status = ["待執行", "執行中", "已完成"];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getStatusColor = (status: string) =>{
    switch (status){
      case "待執行":
        return 'bg-red-500'
      case "執行中":
        return 'bg-orange-500'
      case "已完成":
        return 'bg-green-500'
    }
  }
  const taskCompleted = (status: string)=>{
    if(status === '已完成') return 'line-through text-gray-500'
  }

  return (
    <>
      <Tr>
        <Td><div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}` }></div> </Td>
        <Td><div className={`${taskCompleted(item.status)}`}>{item.task}</div></Td>
        <Td>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {item.status}
            </MenuButton>

            <MenuList>
              {status.map((it) => {
                return (
                  <MenuItem
                    key={it}
                    onClick={() => {
                      setItem({ ...item, status: it });
                    }}
                  >
                    {it}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Td>
        <Td>
          <DeleteIcon onClick={onOpen} />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>確定刪除嗎?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <ConfirmationBlock
                  onConfirmed={()=>{onDelete(item)}}
                  onCencel={()=>{onClose()}}
                  onSelected={()=>{}}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Td>
      </Tr>
    </>
  );
};
