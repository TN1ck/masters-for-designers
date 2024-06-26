import {pairs} from "../../utils/pairs";
import {groupBy} from "../../utils/groupBy";
import {sortBy} from "../../utils/sortBy";
import {flatten} from "../../utils/flatten";

export const MONTH_NAME_MAPPING = {
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
  10: "November",
  11: "Dezember",
};

export const SORT_NAME_MAPPING = {
  alphabet: "Studiengang",
  city: "Studienort",
  university: "Hochschule",
  deadline: "Bewerbungsfrist",
};

export function sortAndGroupMasters(masters, sortKey, universityMap) {
  const groupers = {
    alphabet: masters =>
      pairs(groupBy(masters, d => d.name[0])).map(([key, list]) => [key, key, sortBy(list, d => d.name)]),
    university: masters =>
      pairs(groupBy(masters, d => d.universityName)).map(([key, list]) => [key, key, sortBy(list, m => m.name)]),
    city: masters =>
      pairs(groupBy(masters, d => universityMap[d.universityName].city)).map(([key, list]) => [
        key,
        key,
        sortBy(list, m => m.universityName + m.name),
      ]),
    deadline: masters => {
      const now = new Date();
      const getOffset = date => {
        const monthOffset = new Date(date).getUTCMonth() - now.getMonth();
        return monthOffset < 0 ? monthOffset + 12 : monthOffset;
      };
      const mastersMultipleTimes = flatten(
        masters.map(m => {
          return m.timeAndMoney.applicationDeadlines.map(d => {
            return {
              ...m,
              timeAndMoney: {
                ...m.timeAndMoney,
                // we still put the other dates in as well to not confuse the user
                applicationDeadlines: [d].concat(m.timeAndMoney.applicationDeadlines.filter(dd => d !== dd)),
              },
            };
          });
        }),
      );

      const masterWithDates = mastersMultipleTimes.map(d => {
        // We don't need to sort, as we have all the masters there multiple times
        //
        // const sorted = d.timeAndMoney.applicationDeadlines
        //   .map(d => {
        //     return [getOffset(new Date(d.date)), d];
        //   })
        //   .sort((a, b) => {
        //     return a[0] - b[0];
        //   });

        // The date we want to use is at index [0]
        const nextDate = new Date(d.timeAndMoney.applicationDeadlines[0].date);
        return [d, getOffset(nextDate), nextDate];
      });
      const paired = pairs(groupBy(masterWithDates, d => d[1]));
      return paired.map(([key, list]) => {
        return [
          Number(key),
          MONTH_NAME_MAPPING[list[0][2].getUTCMonth()],
          sortBy(list, ([master, offset, nextDate]) => nextDate.getUTCDate()).map(d => d[0]),
        ];
      });
    },
  };

  const groupedMasters = groupers[sortKey](masters);
  const groupedAndSortedMasters = sortBy(groupedMasters, d => d[0]);
  return groupedAndSortedMasters;
}
