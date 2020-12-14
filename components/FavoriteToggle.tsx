import { Button } from "@chakra-ui/react";
import {
  isFavorite as isFavoriteSelector,
  setFavorite,
  useDispatch,
  useSelector,
} from "@store";
import { TrackableType } from "@types";

export const FavoriteToggle = ({
  type,
  id,
}: {
  type: TrackableType;
  id: string;
}) => {
  const dispatch = useDispatch();
  const isFavorite: boolean = useSelector(isFavoriteSelector(type, id));
  const handleClick = () => {
    dispatch(setFavorite({ type, id, favorite: !isFavorite }));
  };

  return (
    <Button onClick={handleClick}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
};
