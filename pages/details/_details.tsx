import React, { useEffect, useState } from "react";
import { TrackableType } from "@types";
import { useData } from "@hooks/useData";
import { useRouter } from "next/router";
import { Loading } from "@components";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

interface Props {
  type: TrackableType;
  id: string;
}

export const Details = ({ type }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const { getData } = useData();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    getData(type, id as string).then((d) => setData(d));
  }, [id, type]);

  return data ? (
    <Center mt={4}>
      <HStack>
        <Image src={data.poster} />
        <Stack>
          <Box textAlign="center">
            <Heading size="xl">{data.name}</Heading>
            <Text>{data.genres.join(", ")}</Text>
            <Text>{data.runtime || "?"} min</Text>
          </Box>
          <Box textAlign="center">
            <Button mr={1}>Add to Dashboard</Button>
            <Button>Add to Favorites</Button>
          </Box>
          <Box>
            <Heading textAlign="center" as="h2" size="md">
              Overview
            </Heading>
            <Container>
              <Text paddingLeft={10} paddingRight={10}>{data.description}</Text>
            </Container>
          </Box>
        </Stack>
      </HStack>
    </Center>
  ) : (
    <Loading />
  );
};
