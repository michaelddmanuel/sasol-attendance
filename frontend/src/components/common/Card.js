import React from 'react';
import { Box, Heading, Text, Flex } from '@chakra-ui/react';

/**
 * Card component - A reusable card container with title and icon
 * 
 * @param {string} title - The card title
 * @param {React.ReactNode} icon - Optional icon to display
 * @param {string} subtitle - Optional subtitle
 * @param {React.ReactNode} children - Card content
 * @param {Object} props - Additional props to pass to the Box component
 */
const Card = ({ title, icon, subtitle, children, ...props }) => {
  const bgColor = 'white';
  const borderColor = 'gray.200';
  
  return (
    <Box
      bg={bgColor}
      boxShadow="sm"
      borderRadius="lg"
      border="1px"
      borderColor={borderColor}
      overflow="hidden"
      p={6}
      height="100%"
      {...props}
    >
      {(title || icon) && (
        <Flex alignItems="center" mb={4}>
          {icon && <Box mr={3} color="sasol.blue">{icon}</Box>}
          <Box>
            {title && <Heading as="h3" size="md">{title}</Heading>}
            {subtitle && <Text color="gray.600" mt={1}>{subtitle}</Text>}
          </Box>
        </Flex>
      )}
      {children}
    </Box>
  );
};

export default Card;
