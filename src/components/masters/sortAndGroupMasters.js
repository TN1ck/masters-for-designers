import {pairs} from "../../utils/pairs";
import {groupBy} from "../../utils/groupBy";
import {sortBy} from "../../utils/sortBy";

export function sortAndGroupMasters(masters, sortKey, universityMap) {
  const monthNamesMapping = {
    0: "Januar",
    1: "Februar",
    2: "März",
    3: "April",
    4: "Mai",
    5: "Juni",
    6: "Juli",
    7: "August",
    8: "September",
    9: "Oktober",
    10: "Nomeber",
    11: "Dezember",
  };

  const groupers = {
    alphabet: masters => pairs(groupBy(masters, d => d.name[0])).map(([key, list]) => [key, key, list]),
    city: masters =>
      pairs(groupBy(masters, d => universityMap[d.university].city)).map(([key, list]) => [key, key, list]),
    deadline: masters => {
      const now = new Date();
      const getOffset = date => {
        const monthOffset = new Date(date).getUTCMonth() - now.getMonth();
        return monthOffset < 0 ? monthOffset + 12 : monthOffset;
      };
      const masterWithDates = masters.map(d => {
        const sorted = d.applicationDeadlines
          .map(d => {
            return [getOffset(new Date(d.date)), d];
          })
          .sort((a, b) => {
            return a[0] - b[0];
          });
        const nextDate = new Date(sorted[0][1].date);
        return [d, getOffset(nextDate), nextDate];
      });
      const paired = pairs(groupBy(masterWithDates, d => d[1]));
      return paired.map(([key, list]) => [
        Number(key),
        monthNamesMapping[list[0][2].getUTCMonth()],
        list.map(d => d[0]),
      ]);
    },
  };

  const groupedMasters = groupers[sortKey](masters);
  const groupedAndSortedMasters = sortBy(groupedMasters, d => d[0]);
  return groupedAndSortedMasters;
}
