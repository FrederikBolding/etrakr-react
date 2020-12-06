import React from "react";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/react";

export const Loading = () => (
  <>
    <Center>
      <Spinner size="xl" />
    </Center>
  </>
);
