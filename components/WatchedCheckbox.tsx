import { Button, ButtonProps, Checkbox } from "@chakra-ui/react";
import {
  IsEpisodeWatched as IsEpisodeWatched,
  setWatched,
  useDispatch,
  useSelector,
} from "@store";
import { TrackableType } from "@types";

export const WatchedCheckbox = ({
  type,
  id,
  episode
}: {
  type: TrackableType;
  id: string;
  episode: string;
}) => {
  const dispatch = useDispatch();
  const isWatched: boolean = useSelector(IsEpisodeWatched(type, id, episode));
  const handleChange = () => {
    dispatch(setWatched({ type, id, episode, watched: !isWatched }));
  };

  return (
    <Checkbox onChange={handleChange} isChecked={isWatched} />
  );
};
