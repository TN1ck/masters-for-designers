import {empty} from "../../utils/empty";

export const FILTERS = {
  universityType: [
    {
      type: "universityType",
      value: "university",
      name: "Universität",
      filter: (m, u) => u.type === "university",
    },
    {
      type: "universityType",
      value: "artCollege",
      name: "Kunsthochschule",
      filter: (m, u) => u.type === "artCollege",
    },
    {
      type: "universityType",
      value: "college",
      name: "Fachhochschule",
      filter: (m, u) => u.type === "college",
    },
  ],
  masterType: [
    {
      type: "masterType",
      value: "consecutive",
      name: "Konsekutiv",
      filter: m => m.direction.masterType === "consecutive",
    },
    {
      type: "masterType",
      value: "notConsecutive",
      name: "Nicht-konsekutiv",
      filter: m => m.direction.masterType === "notConsecutive",
    },
    {
      type: "masterType",
      value: "studyingFurther",
      name: "Weiterbildend",
      filter: m => m.direction.masterType === "studyingFurther",
    },
  ],
  direction: [
    {
      type: "direction",
      value: "practical",
      name: "Praktisch",
      filter: m => m.direction.direction.includes("practical"),
    },
    {
      type: "direction",
      value: "theoretical",
      name: "Theoretisch",
      filter: m => m.direction.direction.includes("theoretical"),
    },
  ],
  topicFocus: [
    {
      type: "topicFocus",
      value: "fachspezifisch",
      name: "Fachspezifisch",
      filter: m => m.topicAndFocus.topicFocus === "fachspezifisch",
    },
    {
      type: "topicFocus",
      value: "fachuebergreifend",
      name: "Fachübergreifend",
      filter: m => m.topicAndFocus.topicFocus === "fachuebergreifend",
    },
    {
      type: "topicFocus",
      value: "thematisch",
      name: "Thematisch",
      filter: m => m.topicAndFocus.topicFocus === "thematisch",
    },
  ],
  functionalComposition: [
    {
      type: "functionalComposition",
      value: "disciplinary",
      name: "Disziplinär",
      filter: m => m.topicAndFocus.functionalComposition === "disciplinary",
    },
    {
      type: "functionalComposition",
      value: "interdisciplinaryArt",
      name: "Interdisziplinär gestalterisch",
      filter: m => m.topicAndFocus.functionalComposition === "interdisciplinaryArt",
    },
    {
      type: "functionalComposition",
      value: "artAndNonArt",
      name: "Gestalterisch & Nicht-gestalterisch",
      filter: m => m.topicAndFocus.functionalComposition === "artAndNonArt",
    },
  ],
  allowedDisciplinesTag: [
    {
      type: "allowedDisciplinesTag",
      value: "digital",
      name: "Digitale Medien",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("digital"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "filmAndPhotograpy",
      name: "Fotografie/Film",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("filmAndPhotograpy"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "illustrations",
      name: "Illustration",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("illustrations"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "fashion",
      name: "Mode/Textil",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("fashion"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "product",
      name: "Produkt/Industrie",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("product"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "room",
      name: "Innenarchitektur",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("room"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "jewelry",
      name: "Schmuck",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("jewelry"),
    },
    {
      type: "allowedDisciplinesTag",
      value: "visualCommunication",
      name: "Visuelle Kommunikation",
      filter: m => m.topicAndFocus.allowedDisciplinesTag.includes("visualCommunication"),
    },
  ],
  allowedForms: [
    {
      type: "allowedForms",
      value: "fullTime",
      name: "Vollzeit",
      filter: m => m.timeAndMoney.allowedForms.includes("fullTime"),
    },
    {
      type: "allowedForms",
      value: "partTime",
      name: "Teilzeit",
      filter: m => m.timeAndMoney.allowedForms.includes("partTime"),
    },
    {
      type: "allowedForms",
      value: "extraOccupational",
      name: "Berufsbegleitend",
      filter: m => m.timeAndMoney.allowedForms.includes("extraOccupational"),
    },
    {
      type: "allowedForms",
      value: "remote",
      name: "Fernstudium",
      filter: m => m.timeAndMoney.allowedForms.includes("remote"),
    },
  ],
  semesterType: [
    {
      type: "semesterType",
      value: "summer",
      name: "Sommersemester",
      filter: m => m.timeAndMoney.applicationDeadlines.some(d => d.type === "summer"),
    },
    {
      type: "semesterType",
      value: "winter",
      name: "Wintersemester",
      filter: m => m.timeAndMoney.applicationDeadlines.some(d => d.type === "winter"),
    },
  ],
  internationalityEnglish: [
    {
      type: "internationalityEnglish",
      value: "english",
      name: "Englischsprachig",
      filter: m => m.internationality.mainLanguages.includes("english"),
    },
  ],
  internationalitySemesterAbroad: [
    {
      type: "internationalitySemesterAbroad",
      value: "semesterAbroad",
      name: "Intergriertes Auslandssemster",
      filter: m => m.internationality.semesterAbroad !== "no",
    },
  ],
  internationalityDoubleDegree: [
    {
      type: "internationalityDoubleDegree",
      value: "doubleDegree",
      name: "Doppelabschluss",
      filter: m => m.internationality.doubleDegree,
    },
  ],
};

export function filterMasters(masters, filters, universityMap) {
  const filteredMasters = masters.filter(m => {
    const university = universityMap[m.universityName];
    const universityType = empty(filters.universityType) || filters.universityType.includes(university.type);

    const masterType = empty(filters.masterType) || filters.masterType.includes(m.direction.masterType);

    const masterDirection = empty(filters.direction) || filters.direction.some(d => m.direction.direction.includes(d));

    const topicFocus = empty(filters.topicFocus) || filters.topicFocus.includes(m.topicAndFocus.topicFocus);

    const functionalComposition =
      empty(filters.functionalComposition) ||
      filters.functionalComposition.includes(m.topicAndFocus.functionalComposition);

    const allowedDisciplinesTag =
      empty(filters.allowedDisciplinesTag) ||
      filters.allowedDisciplinesTag.some(d => m.topicAndFocus.allowedDisciplinesTag.includes(d));

    const allowedForms =
      empty(filters.allowedForms) || filters.allowedForms.some(d => m.timeAndMoney.allowedForms.includes(d));

    const semesterType =
      empty(filters.semesterType) ||
      filters.semesterType.some(d => m.timeAndMoney.applicationDeadlines.some(dd => dd.type === d));

    const english = empty(filters.internationalityEnglish) || m.internationality.mainLanguages.includes("english");
    const semesterAbroad = empty(filters.internationalitySemesterAbroad) || m.internationality.semesterAbroad !== "no";
    const doubleDegree = empty(filters.internationalityDoubleDegree) || m.internationality.doubleDegree;

    return (
      universityType &&
      masterType &&
      masterDirection &&
      topicFocus &&
      functionalComposition &&
      allowedDisciplinesTag &&
      allowedForms &&
      semesterType &&
      english &&
      semesterAbroad &&
      doubleDegree
    );
  });
  return filteredMasters;
}
