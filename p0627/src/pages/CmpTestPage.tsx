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

export const CmpTestPage = () => {
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
    </>
  );
};
