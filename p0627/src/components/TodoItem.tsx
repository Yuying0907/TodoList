import { useState } from "react";
import { ITodo } from "../interfaces/ITodo";
import { Box, Heading, Stack, StackDivider, Checkbox, Input, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { CheckIcon, EditIcon, SmallCloseIcon } from "@chakra-ui/icons";

interface TodoItemProps {
  todo: ITodo;
  onDelete: (todo: ITodo) => void;
}

export const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  const [item, setItem] = useState<ITodo>(todo);
  const [checked, setChecked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [tempData, setTempData] = useState(item);

  const handleSave = () => {
    setItem(tempData);
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setTempData(item);
    setIsEditing(false);
  };

  return (
    <>
      <Stack divider={<StackDivider />} spacing="8" >
        <Box
          p={3}
          borderRadius="md"
          className="grid grid-flow-col grid-row-3 m-3"
        >
          <div className="col-span-2 gap-4">
            <div className="flex items-center justify-start">
              <Heading size="xs" textTransform="uppercase">
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: checked ? 0.4 : 1 }}
                  transition={{ duration: 0.5 }}
                  className={`${checked ? "line-through" : ""}`}
                >
                  <div className="text-2xl">
                    { isEditing ? (
                      <Input
                        size="sm"
                        value={(tempData.task)}
                        onChange={(event)=>{
                          setTempData({...tempData, task: event.target.value})
                        }}
                      />                    
                    ): item.task }
                    
                  </div>
                </motion.span>
              </Heading>
            </div>
            <div className="flex items-center justify-start">
              { isEditing ? (
                <Input
                  size="sm"
                  type="datetime-local"
                  value={(tempData.date)+'T'+(tempData.time)}
                  onChange={(event) => {
                    const value = event.target.value;
                    const [ newDate, newTime] = value.split('T')
                    setTempData({...tempData, date: newDate, time: newTime})
                  }}
                />
              ) : item.time }              
            </div>
            <div>
              { isEditing ? (
                <Flex p='1.5' gap='1.5'>
                  <CheckIcon onClick={handleSave}/>
                  <SmallCloseIcon onClick={handleCancelEdit}/>
                </Flex>                
              ) : (
                <EditIcon
                onClick={()=>{setIsEditing(true)}}/>
              )}
              
                         
            </div>
          </div>
          <div className="col-span-2 row-span-2 flex justify-end items-center p-3">
            <Checkbox
              isChecked={checked}
              onChange={() => setChecked(!checked)}
              colorScheme="green"
              spacing={5}
              size="lg"
            ></Checkbox>
          </div>
        </Box>
      </Stack>
    </>
  );
};
