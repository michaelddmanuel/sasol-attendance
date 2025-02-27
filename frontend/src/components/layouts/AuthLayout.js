import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Animation keyframes
const animateGradient = keyframes`
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
`;

// Bubble animation for background elements
const float = keyframes`
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0px) translateX(0px); }
`;

// Molecule animation - more dramatic movement
const moleculeFloat = keyframes`
  0% { transform: translateY(0px) translateX(0px) scale(1); }
  25% { transform: translateY(-30px) translateX(20px) scale(1.05); }
  50% { transform: translateY(10px) translateX(40px) scale(1.1); }
  75% { transform: translateY(30px) translateX(-20px) scale(1.05); }
  100% { transform: translateY(0px) translateX(0px) scale(1); }
`;

const bubbleAnimation = `${float} 8s ease-in-out infinite`;
const moleculeAnimation = `${moleculeFloat} 20s ease-in-out infinite`;

const AuthLayout = () => {
  return (
    <Flex 
      minHeight="100vh" 
      width="full" 
      align="center" 
      justifyContent="center" 
      position="relative"
      py={10}
      overflow="hidden"
      bg="white"
    >
      {/* YouTube Video Background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={0}
        overflow="hidden"
        pointerEvents="none"
      >
        <Box
          as="iframe"
          src="https://www.youtube.com/embed/G0WSU5x1-EE?autoplay=1&controls=0&showinfo=0&mute=1&loop=1&playlist=G0WSU5x1-EE&disablekb=1&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&vq=hd1080"
          title="Sasol Background Video"
          width="100%"
          height="100%"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%) scale(1.2)" // Scale up to cover the container
          opacity={1}
          sx={{
            border: "none",
            pointerEvents: "none",
          }}
          allowFullScreen
        />
        {/* Removing white overlay */}
      </Box>

      {/* Animated Sasol Molecule */}
      <Image
        src="/sasol-icon.png"
        alt="Sasol Icon"
        position="absolute"
        width="240px"
        objectFit="contain"
        top="10%"
        right="15%"
        zIndex={1}
        sx={{
          animation: moleculeAnimation,
          filter: 'drop-shadow(0 0 8px rgba(15, 49, 81, 0.3))',
        }}
      />
      
      {/* Additional smaller molecule */}
      <Image
        src="/sasol-icon.png"
        alt="Sasol Icon"
        position="absolute"
        width="120px"
        objectFit="contain"
        bottom="15%"
        left="10%"
        zIndex={1}
        sx={{
          animation: `${moleculeFloat} 15s ease-in-out 2s infinite`,
          filter: 'drop-shadow(0 0 5px rgba(15, 49, 81, 0.2))',
        }}
      />
      
      {/* Third molecule - medium size with combined animations */}
      <Image
        src="/sasol-icon.png"
        alt="Sasol Icon"
        position="absolute"
        width="180px"
        objectFit="contain"
        top="65%"
        right="25%"
        zIndex={1}
        sx={{
          animation: `${moleculeAnimation} 30s linear infinite, ${moleculeFloat} 12s ease-in-out 1s infinite`,
          filter: 'drop-shadow(0 0 6px rgba(15, 49, 81, 0.25))',
        }}
      />
      
      {/* Fourth molecule - smaller size with slow rotation */}
      <Image
        src="/sasol-icon.png"
        alt="Sasol Icon"
        position="absolute"
        width="100px"
        objectFit="contain"
        top="25%"
        left="20%"
        zIndex={1}
        sx={{
          animation: `${moleculeAnimation} 45s linear reverse infinite`,
          filter: 'drop-shadow(0 0 4px rgba(15, 49, 81, 0.2))',
        }}
      />
      
      {/* Animated background bubbles - Blue spheres with gradient effects */}
      {/* Bubble 1 */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        w="100px"
        h="100px"
        borderRadius="full"
        bg="linear-gradient(145deg, #4C9EEB, #1A5BA8)"
        boxShadow="inset -10px -10px 20px rgba(0,0,0,0.2), 0 4px 15px rgba(26, 91, 168, 0.3)"
        sx={{ animation: bubbleAnimation }}
        zIndex={0}
      />
      
      {/* Bubble 2 */}
      <Box
        position="absolute"
        bottom="15%"
        right="10%"
        w="150px"
        h="150px"
        borderRadius="full"
        bg="linear-gradient(145deg, #4C9EEB, #1A5BA8)"
        boxShadow="inset -15px -15px 30px rgba(0,0,0,0.2), 0 6px 20px rgba(26, 91, 168, 0.3)"
        sx={{ animation: `${bubbleAnimation} 10s ease-in-out infinite` }}
        zIndex={0}
      />
      
      {/* Bubble 3 */}
      <Box
        position="absolute"
        top="60%"
        left="15%"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="linear-gradient(145deg, #4C9EEB, #1A5BA8)"
        boxShadow="inset -8px -8px 16px rgba(0,0,0,0.2), 0 3px 12px rgba(26, 91, 168, 0.3)"
        sx={{ animation: `${bubbleAnimation} 12s ease-in-out infinite` }}
        zIndex={0}
      />
      
      {/* Bubble 4 - New */}
      <Box
        position="absolute"
        top="30%"
        left="25%"
        w="60px"
        h="60px"
        borderRadius="full"
        bg="linear-gradient(145deg, #4C9EEB, #1A5BA8)"
        boxShadow="inset -6px -6px 12px rgba(0,0,0,0.2), 0 3px 10px rgba(26, 91, 168, 0.3)"
        sx={{ animation: `${bubbleAnimation} 9s ease-in-out 1s infinite` }}
        zIndex={0}
      />
      
      {/* Bubble 5 - New */}
      <Box
        position="absolute"
        bottom="35%"
        right="20%"
        w="120px"
        h="120px"
        borderRadius="full"
        bg="linear-gradient(145deg, #4C9EEB, #1A5BA8)"
        boxShadow="inset -12px -12px 24px rgba(0,0,0,0.2), 0 5px 18px rgba(26, 91, 168, 0.3)"
        sx={{ animation: `${bubbleAnimation} 14s ease-in-out 2s infinite` }}
        zIndex={0}
      />
      
      {/* Bubble 6 - New */}
      <Box
        position="absolute"
        top="75%"
        right="30%"
        w="50px"
        h="50px"
        borderRadius="full"
        bg="linear-gradient(145deg, #4C9EEB, #1A5BA8)"
        boxShadow="inset -5px -5px 10px rgba(0,0,0,0.2), 0 3px 8px rgba(26, 91, 168, 0.3)"
        sx={{ animation: `${bubbleAnimation} 11s ease-in-out 3s infinite` }}
        zIndex={0}
      />
      
      {/* Bubble 7 - New */}
      <Box
        position="absolute"
        top="20%"
        right="15%"
        w="90px"
        h="90px"
        borderRadius="full"
        bg="linear-gradient(145deg, #4C9EEB, #1A5BA8)"
        boxShadow="inset -9px -9px 18px rgba(0,0,0,0.2), 0 4px 14px rgba(26, 91, 168, 0.3)"
        sx={{ animation: `${bubbleAnimation} 13s ease-in-out 1.5s infinite` }}
        zIndex={0}
      />
      
      <Box
        px={8}
        py={10}
        width="full"
        maxWidth="450px"
        borderRadius="xl"
        boxShadow="lg"
        bg="white"
        position="relative"
        zIndex={2}
      >
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          right={0} 
          h="8px" 
          bg="sasol.primary" 
        />
        
        <VStack spacing={8} align="center">
          {/* Sasol logo */}
          <Image 
            src="/sasol-logo-full.png" 
            alt="Sasol Logo" 
            maxW="200px" 
            mx="auto"
            fallbackSrc="https://companieslogo.com/img/orig/SSL_BIG-b85eb681.png?t=1720244494&download=true"
          />
          
          {/* The child routes will be rendered here */}
          <Box w="100%">
            <Outlet />
          </Box>
          
          <Text fontSize="sm" color="gray.500" textAlign="center" mt={4}>
            &copy; {new Date().getFullYear()} Sasol. All rights reserved.
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default AuthLayout;
