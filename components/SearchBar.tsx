import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

export const SearchBar = (props) => (
  <InputGroup {...props}>
    <InputLeftElement
      pointerEvents="none"
      children={<SearchIcon color="gray.300" />}
    />
    <Input variant="outline" width="20rem" placeholder="Search" />
  </InputGroup>
);
