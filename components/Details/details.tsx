import React, { useEffect, useState } from "react";
import { TrackableType } from "@types";
import { useData } from "@hooks/useData";
import { useRouter } from "next/router";
import { Loading, EpisodeTable, DashboardToggle } from "@components";
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
import { FavoriteToggle } from "@components/FavoriteToggle";

interface Props {
  type: TrackableType;
}

export const Details = ({ type }: Props) => {
  const router = useRouter();
  const id = router.query.id as string;

  const { getData } = useData();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    if (id !== undefined) {
      getData(type, id as string).then((d) => setData(d));
    }
  }, [id, type]);

  return data ? (
    <Center mt={4}>
      <Stack>
        <Stack direction={{ base: "column", md: "row" }} align="center">
          <Image src={data.poster} />
          <Stack>
            <Box textAlign="center">
              <Heading size="xl">{data.name}</Heading>
              <Text>{data.genres.join(", ")}</Text>
              <Text>{data.runtime || "?"} min</Text>
            </Box>
            <Stack
              direction={["column", "row"]}
              justifyContent="center"
              textAlign="center"
            >
              <DashboardToggle type={type} id={id} />
              <FavoriteToggle type={type} id={id} />
            </Stack>
            <Box>
              <Heading textAlign="center" as="h2" size="md">
                Overview
              </Heading>
              <Container>
                <Text paddingLeft={10} paddingRight={10}>
                  {data.description}
                </Text>
              </Container>
            </Box>
          </Stack>
        </Stack>
        {data.seasons && (
          <EpisodeTable
            type={type}
            id={id}
            seasons={data.seasons}
            mt="3rem !important"
            maxW="100vw"
          />
        )}
      </Stack>
    </Center>
  ) : (
    <Loading />
  );
};
