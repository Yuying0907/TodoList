import { Outlet, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { ConfirmationBlock } from "../components/ConfirmationBlock";

export const MainLayout = () => {
  const navigate = useNavigate();
  //meun 
  const { isOpen, onOpen, onClose } = useDisclosure();
  //logout
  const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure()

  const menu = [
    {
      title: "CmpTest",
      path: "/main/cmpTest",
    },
    {
      title: "TodoList",
      path: "/main/todoList",
    },
  ];
  return (
    <>
      <div className="flex justify-start p-3">
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="menu"
          onClick={onOpen}
        />
      </div>
      <Outlet />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>選單</DrawerHeader>

          <DrawerBody>
            {menu.map((item) => {
              return (
                <div
                  className="text-white rounded-xl bg-sky-500 hover:bg-sky-700 p-3 m-3"
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onLogoutOpen}>
              <Modal isOpen={isLogoutOpen} onClose={onLogoutClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalBody>
                    <div className="flex flex justify-center font-bold text-4xl m-3 p-3">
                      確定要登出嗎?
                    </div>                    
                  </ModalBody>
                  <ModalFooter>
                    <ConfirmationBlock
                      onConfirmed={() => {}}
                      onCencel={() => {}}
                      onSelected={(isConfirmed) => {
                        isConfirmed ? navigate("/") : onLogoutClose();
                      }}
                    />
                  </ModalFooter>
                </ModalContent>
              </Modal>
              登出
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
