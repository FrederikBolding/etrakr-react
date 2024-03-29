import {
    Box,
    Center,
    Container,
    Heading,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  
  export default function Custom404() {
    return (
      <Box
        pt="2rem"
        pb={{ base: "0", md: "5rem" }}
        textAlign="center"
      >
        <Container>
          <Center>
            <Heading m="2" as="h1" size="2xl">
              404
            </Heading>
          </Center>
          <Text mt="4" opacity="0.75">
            These are not the droids you are looking for.
          </Text>
        </Container>
      </Box>
    );
  }
  