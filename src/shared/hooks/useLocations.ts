import { useLocationsStore } from '../store/useLocations';

export const useLocations = () => {
  const locations = useLocationsStore(s => s.locations);
  const addLocation = useLocationsStore(s => s.addLocation);
  return { locations, addLocation };
};
