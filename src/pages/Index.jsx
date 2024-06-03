import { useState, useEffect } from "react";
import { Box, Button, Text, VStack, Image } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [splits, setSplits] = useState([]);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!running) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handleSplit = () => {
    setSplits([...splits, formatTime(time)]);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="red.500"
      color="white"
    >
      <VStack spacing={4}>
        <Image src="/images/red-stopwatch.png" alt="Red Stopwatch" boxSize="150px" />
        <Text fontSize="4xl" fontFamily="monospace">
          {formatTime(time)}
        </Text>
        <Button
          colorScheme="yellow"
          onClick={() => setRunning(!running)}
        >
          {running ? "Stop" : "Start"}
        </Button>
        <Button
          colorScheme="yellow"
          onClick={() => {
            setTime(0);
            setRunning(false);
            setSplits([]);
          }}
        >
          Reset
        </Button>
        <Button colorScheme="yellow" onClick={handleSplit}>
          Split
        </Button>
        <VStack spacing={2} align="stretch">
          {splits.map((split, index) => (
            <Text key={index} fontSize="2xl" fontFamily="monospace">
              Split {index + 1}: {split}
            </Text>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;