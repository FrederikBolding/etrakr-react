import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { SearchBar } from "./SearchBar";
import Link from "next/link";

const MenuItems = ({ children, href }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    <Link href={href}>{children}</Link>
  </Text>
);

export const Header = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="blue.700"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Image maxWidth="100px" src="/logo.png" />
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems href="/dashboard">Dashboard</MenuItems>
        <MenuItems href="/stats">Stats</MenuItems>
        <Box
          display={{ md: "flex" }}
          position={{ base: "relative", md: "absolute" }}
          right={{ md: "1rem" }}
        >
          <DarkModeToggle mt={{ base: 4, md: 0 }} />
          <SearchBar mt={{ base: 4, md: 0 }} />
        </Box>
      </Box>
    </Flex>
  );
};
