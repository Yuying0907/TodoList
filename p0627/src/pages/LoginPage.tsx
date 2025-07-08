import {
  HStack,
  ModalFooter,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  
  const [pin, setPin] = useState<string | null>(
    window.localStorage.getItem("pin")
  );

  const [isLogin, setLogin] = useState<boolean>(false);
  const onClose = () => {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!pin) return;
    window.localStorage.setItem("pin", pin);
  }, [pin]);

  useEffect(() => {
    if (isLogin) {
      navigate("/main/cmpTest");
    }
  }, [isLogin]);
  return (
    <>
      <Modal isOpen={!pin} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>設定密碼</ModalHeader>
          <ModalBody>
            <div className="flex justify-center items-centergap-2">
              <HStack>
                <PinInput
                  type="alphanumeric"
                  onComplete={(userPin) => {
                    setPin(userPin);
                  }}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </div>
          </ModalBody>
          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={!!pin && !isLogin} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <div className="text-4xl font-bold md:text-center">
            <ModalHeader>輸入密碼</ModalHeader>
          </div>

          <ModalBody>
            <div className="grid place-content-around">
              <HStack spacing={4}>
                <PinInput
                  type="alphanumeric"
                  onComplete={(inputPin) => {
                    setLogin(pin === inputPin);
                  }}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
