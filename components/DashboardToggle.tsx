import { Button, ButtonProps } from "@chakra-ui/react";
import {
  isOnDashboard as isOnDashboardSelector,
  setDashboardState,
  setFavorite,
  useDispatch,
  useSelector,
} from "@store";
import { TrackableType } from "@types";

export const DashboardToggle = ({
  type,
  id,
  mr
}: {
  type: TrackableType;
  id: string;
  mr?: number;
}) => {
  const dispatch = useDispatch();
  const isOnDashboard: boolean = useSelector(isOnDashboardSelector(type, id));
  const handleClick = () => {
    dispatch(setDashboardState({ type, id, dashboard: !isOnDashboard }));
  };

  return (
    <Button onClick={handleClick} mr={mr}>
      {isOnDashboard ? "Remove from Dashboard" : "Add to Dashboard"}
    </Button>
  );
};
