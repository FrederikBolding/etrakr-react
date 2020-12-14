import { Button } from "@chakra-ui/react";
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
  ...rest
}: {
  type: TrackableType;
  id: string;
}) => {
  const dispatch = useDispatch();
  const isOnDashboard: boolean = useSelector(isOnDashboardSelector(type, id));
  const handleClick = () => {
    dispatch(setDashboardState({ type, id, dashboard: !isOnDashboard }));
  };

  return (
    <Button onClick={handleClick} {...rest}>
      {isOnDashboard ? "Remove from Dashboard" : "Add to Dashboard"}
    </Button>
  );
};
