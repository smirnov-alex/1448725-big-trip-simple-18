import { filter } from '../utils/common.js';

export const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    noPoints: filterPoints(points).length === 0,
  }),
);
