import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Heading,
  Input,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TodoItem } from "../components/TodoItem";
import { SetStateAction, useEffect, useState } from "react";
import { ITodo } from "../interfaces/ITodo";
import { SearchIcon } from "@chakra-ui/icons";

import { motion } from "framer-motion";

export const TodoListPage = () => {
  const [todoList, setTodoList] = useState<ITodo[]>(() => {
    const stored = localStorage.getItem("todoItem");
    return stored ? JSON.parse(stored) : [];
  });
  const [show, setShow] = useState<boolean>(false);

  const [timeInput, setTimeInput] = useState<string>("");
  const [datePart, setDatePart] = useState("");
  const [timePart, setTimePart] = useState("");
  //const [idInput, setIdInput] = useState<number | null>(null);
  const [taskInput, setTaskInput] = useState<string>("");

  const [filterInput, setFilterInput] = useState<string>("");

  useEffect(() => {
    if (!todoList) return;
    window.localStorage.setItem("todoItem", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    const todoItem = window.localStorage.getItem("todoItem");
    if (todoItem) {
      setTodoList(JSON.parse(todoItem));
    } else {
      setTodoList([]);
    }
  }, []);

  const handleToggle = () => {
    setShow(!show);
  };

  const handleAddNewTodoItem = () => {
    if (!todoList) return;
    //if (idInput === null || isNaN(idInput)) return;

    setTodoList([
      ...todoList,
      {
        date: datePart,
        time: timePart,
        task: taskInput,
        status: "待執行",
      },
    ]);
  };

  const handleFilterEvents = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setFilterInput(e.target.value);
  };

  const handleSwipe = (offsetX: number, index: number) =>{
    if (offsetX > 100) {
      setTodoList((prev) => prev.filter((_, i) => i !== index));
    } else if (offsetX < -100) {
      
    }
  }
  return (
    <>
      <div className="flex items-center p-2 m-2">
        <div className="p-2">
          <SearchIcon />
        </div>
        <Input value={filterInput} onChange={handleFilterEvents} />
      </div>
      <Button
        className="container py-5 px-10 mx-0 min-w-full flex flex-col items-center"
        size="sm"
        onClick={handleToggle}
        mt="1rem"
      >
        {show ? "關閉" : "新增"}
      </Button>
      <Collapse startingHeight={0} animateOpacity in={show}>
        <Box>
          {/* <Input
            placeholder="ID"
            value={idInput != null ? idInput : ""}
            onChange={(event) => {
              setIdInput(Number(event.target.value));
            }}
          /> */}
          <div className="w-100 flex-col justify-center">
            <Input
              placeholder="新增事項"
              value={taskInput}
              onChange={(event) => {
                setTaskInput(event.target.value);
              }}
            />
            <Input
              placeholder="選擇日期"
              size="md"
              type="datetime-local"
              value={timeInput}
              onChange={(event) => {
                const value = event.target.value;
                setTimeInput(value);
                const [date, time] = value.split("T");
                setDatePart(date);
                setTimePart(time);
              }}
            />
          </div>
        </Box>
        <Button onClick={handleAddNewTodoItem}>送出</Button>
      </Collapse>

      <div className="flex flex-col item-center m-2">
        <Card>
          <CardHeader>
            <Heading size="md">日期</Heading>
          </CardHeader>

          <CardBody>
            {todoList
              .filter((todo) => {
                if (filterInput) {
                  return JSON.stringify(todo).includes(filterInput);
                } else {
                  return true;
                }
              })
              .map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(event, info) =>
                      handleSwipe(info.offset.x, index)
                    }
                    className="w-96 h-32 m-3 bg-blue-500 rounded-lg text-white shadow-lg"
                    whileDrag={{ scale: 1.05 }}
                  >
                    <TodoItem
                      key={item.task}
                      todo={item}
                      onDelete={(item) => {
                        setTodoList(
                          todoList.filter((todo) => todo.task !== item.task)
                        );
                      }}
                    ></TodoItem>
                  </motion.div>
                );
              })}
          </CardBody>
        </Card>
      </div>

      {/* <div className="flex flex-col items-center">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>工作</Th>
                <Th>完成狀態</Th>
              </Tr>
            </Thead>
            <Tbody>
              {todoList
                .filter((todo) => {
                  if (filterInput) {
                    return JSON.stringify(todo).includes(filterInput);
                  } else {
                    return true;
                  }
                })
                .map((item) => {
                  return (
                    <TodoItem
                      key={item.task}
                      todo={item}
                      onDelete={(item) => {
                        setTodoList(
                          todoList.filter((todo) => todo.task !== item.task)
                        );
                      }}
                    ></TodoItem>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </div> */}
    </>
  );
};
