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
import { TrackableData, SearchResult } from "@types";
import { buildRoute } from "@utils";
import debounce from "lodash/debounce";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const SearchBar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [results, setResults] = useState<SearchResult[] | undefined>(undefined);
  const router = useRouter()

  const handleSearch = debounce(
    (event) => search(event.target.value).then((r) => setResults(r)),
    400
  );

  useEffect(() => isOpen && setResults(undefined), [isOpen]);
  useEffect(() => isOpen && onClose(), [router.asPath])

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
          <InputGroup {...props} mt={0}>
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
                <Box p={1} _hover={{ bg: "blue.700", cursor: "pointer" }}>
                  <Link href={buildRoute(r.type, r.id)}>
                    <Text>
                      {r.name} <Badge>{r.type}</Badge>
                    </Text>
                  </Link>
                </Box>
              ))}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
