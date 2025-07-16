import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  PinInput,
  Box,
  PinInputField,
} from "@chakra-ui/react";
import { useState } from "react";

export const CmpTestPage = () => {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      <div className="text-center text-blue-500">測試 Tailwind</div>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
        <Box border="2px solid black" p={4} borderRadius="md" >
          <HStack spacing={4}>
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </Box>
        <div>
          <div className="flex flex-col items-center space-y-4">
      <div className="text-xl font-semibold">
        {selectedHour !== null ? `選擇時間: ${selectedHour}:00` : "請選擇小時"}
      </div>

      <div className="relative w-64 h-64 rounded-full border-4 border-gray-300">
        {hours.map((hour, i) => {
          const angle = (i / 12) * 2 * Math.PI;
          const x = 50 + 40 * Math.sin(angle); // percent
          const y = 50 - 40 * Math.cos(angle); // percent

          return (
            <button
              key={hour}
              onClick={() => setSelectedHour(hour)}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-white
              ${selectedHour === hour ? "bg-blue-600" : "bg-gray-500 hover:bg-blue-400"}
              transition`}
              style={{
                top: `${y}%`,
                left: `${x}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {hour}
            </button>
          );
        })}
      </div>
    </div>
        </div>
        
    </>
  );
};
