const fs = require("fs");
const _ = require("lodash");
const slugify = require("../src/utils/slugify").slugify;
const mastersRaw = JSON.parse(fs.readFileSync("excel.json", "utf8"));

const masters = mastersRaw.masters.map(masterRaw => {
  const transformed = {
    name: masterRaw.Studiengang,
    applicationDeadlines: masterRaw.Bewerbungsfrist.replace(/\[|\]|\s|”|“/g, "")
      .split(",")
      .map(d => {
        const date = new Date(Date.parse(d));
        const month = date.getMonth();
        return {
          date,
          international: false,
          type: month < 5 ? "summer" : "winter",
        };
      }),
    university: masterRaw.Name,
    otherUniversity: masterRaw["Hochschulübergreifend"],
    department: masterRaw["Fachbereich"],
    direction: {
      degree: masterRaw.Abschluss.toLowerCase(),
      direction: masterRaw.Ausrichtung.replace(/ /g, "")
        .split(",")
        .map(d => (d === "praktisch" ? "practical" : "theoretical")),
      masterType: {
        konsekutiv: "consecutive",
        "nicht-konsekutiv": "notConsecutive",
        weiterbildend: "studyingFurther",
      }[masterRaw.Mastertyp.toLowerCase()],
    },
    topicAndFocus: {
      topicFocus: {
        fachspezifisch: "fachspezifisch",
        thematisch: "thematisch",
        fachübergreifend: "fachuebergreifend",
      }[masterRaw["Inhaltlicher Fokus"]],
      functionalComposition: {
        disziplinär: "disciplinary",
        "interdisziplinär gestalterisch": "interdisciplinaryArt",
        "gestalterisch & nicht-gestalterisch": "artAndNonArt",
      }[masterRaw["Disziplinäre Zusammensetzung"]],
      allowedDisciplines: masterRaw["Zugelassene Disziplinen"],
      allowedDisciplinesTag: masterRaw["Zugelassene DisziplinenTag"]
        .toLowerCase()
        .replace("digitale medien", "digitale-medien")
        .replace("illustrationen", "illustration")
        .replace("visuelle kommunikation", "visuelle-kommunikation")
        .split(" ")
        .filter(d => d !== "")
        .map(d => {
          const result = {
            "digitale-medien": "digital",
            "film/fotografie": "filmAndPhotograpy",
            illustration: "illustrations",
            "mode/textil": "fashion",
            "produkt/industrie": "product",
            raum: "room",
            schmuck: "jewelry",
            "visuelle-kommunikation": "visualCommunication",
          }[d];
          return result;
        }),
    },
    timeAndMoney: {
      allowedForms: masterRaw["Studienform"].split(", ").map(d => {
        return {
          teilzeit: "partTime",
          berufsbegleitend: "extraOccupational",
          vollzeit: "fullTime",
          fernstudium: "remote",
        }[d.toLowerCase()];
      }),
      costs: masterRaw["Gebühren"] === "nein" ? 0 : Number(masterRaw["Gebühren"].match(/[\d\.]+/)[0].replace(".", "")),
      semester: masterRaw["Regelstudienzeit "] + "" || "4",
    },
    internationality: {
      mainLanguages: masterRaw["Hauptunterrichtssprache"].split(", ").map(d => {
        return {
          deutsch: "german",
          englisch: "english",
        }[d.toLowerCase()];
      }),
      semesterAbroad: {
        nein: "no",
        ja: "yes",
        wahlweise: "choose",
      }[masterRaw["Integriertes Auslandssemester"]],
      doubleDegree: masterRaw["Doppelter Abschluss"] === "ja",
    },
    metadata: {
      website: masterRaw["website"],
      facebook: masterRaw["facebook"],
      instagram: masterRaw["instagram"],
      twitter: masterRaw["twitter"],
    },
  };
  // console.log(transformed);
  return transformed;
});

const schools = _.uniqBy(mastersRaw.masters, m => m.Name.toLowerCase()).map(m => {
  const school = {
    name: m.Name,
    city: m.Stadt,
    address: m.Adresse,
    type: {
      Kunsthochschule: "artCollege",
      Fachhochschule: "college",
      Universität: "university",
    }[m.Hochschultyp],
    longitude: Number(m.longitude),
    latitude: Number(m.latitude),
  };
  return school;
});

schools.forEach(school => {
  const filename = `2019-04-27-${slugify(school.name)}.json`;
  fs.writeFileSync(`schools/${filename}`, JSON.stringify(school));
});

_.sortBy(masters, m => m.university).forEach((m, i) => {
  const filename = `${slugify(m.university)}-${slugify(m.name)}.json`;
  fs.writeFileSync(`masters/${filename}`, JSON.stringify(m));
});
