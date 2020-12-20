import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Index() {
  return (
    <Box
      pt={{ base: "6rem", md: "8rem" }}
      pb={{ base: "0", md: "5rem" }}
      textAlign="center"
    >
      <Container>
        <Center>
          <Heading m="2" as="h1" size="2xl">
            eTrakr is your all-in-one entertainment tracking web application
          </Heading>
        </Center>
        <Text mt="4" opacity="0.75">
          The application is fast, local and privacy minded. Everything happens
          directly in your browser. No accounts or data collection, we don't
          want your data. An open source passion project rebuilt from the ground up with
          React.
        </Text>
        <Center mt="4">
          <Link href="/dashboard">
            <Button size="lg" as="a" fontSize="1.3rem" h="3.5rem">
              Get Started
            </Button>
          </Link>
        </Center>
      </Container>
    </Box>
  );
}
