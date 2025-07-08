import {
  Box,
  Button,
  Collapse,
  Input,
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

export const TodoListPage = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [show, setShow] = useState<boolean>(false);

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
          <Input
            placeholder="新增事項"
            value={taskInput}
            onChange={(event) => {
              setTaskInput(event.target.value);
            }}
          />
        </Box>
        <Button onClick={handleAddNewTodoItem}>送出</Button>
      </Collapse>

      <div className="flex flex-col items-center">
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
      </div>
    </>
  );
};
