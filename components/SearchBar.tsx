import { search } from "@api/api";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const SearchBar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [results, setResults] = useState(undefined);

  // @todo debounce
  const handleSearch = (event) =>
    search(event.target.value).then((r) => setResults(r));

  return (
    <>
      <IconButton
        {...props}
        colorScheme="none"
        aria-label="Search"
        onClick={onOpen}
        icon={<SearchIcon />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <InputGroup {...props}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              variant="outline"
              placeholder="Search"
              onChange={handleSearch}
            />
          </InputGroup>
          {results && (
            <>
              {results.map((r) => (
                <Box p={1} _hover={{ bg: 'blue.700', cursor: 'pointer' }}>
                  <Text>{r.title || r.name}{' '}<Badge>TYPE</Badge></Text>
                </Box>
              ))}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
