import FuzzySet from "fuzzyset.js";

export const namesMorphology = [
  "Leukocyty",
  "Erytrocyty",
  "Hemoglobina",
  "Hematokryt",
  "MCV",
  "MCH",
  "MCHC",
  "Płytki",
  "RDW_CV",
  "PDW",
  "MPV",
  "P-LCR",
  "Neutrofile",
  "Limfocyty",
  "Monocyty",
  "Eozynofile",
  "Bazofile",
];
const namesThyroid = ["TSH", "FT3", "FT4", "anty_TPO", "anty_TG"];
const namesGlucoze = ["Glukoza", "Insulina"];
const namesLiver = ["AST", "ALT"];
const bloodTestNames = [...namesMorphology, ...namesThyroid, ...namesGlucoze, ...namesLiver];

const withPercentMorphology = ["Neutrofile %", "Limfocyty %", "Monocyty %", "Eozynofile %", "Bazofile %"];

const fuzy = FuzzySet(bloodTestNames);

const similarityThreshold = 0.6;

const getName = (line) => {
  const element = line.split(" ")[0];
  const result = fuzy.get(element) && fuzy.get(element)[0][0] > similarityThreshold && fuzy.get(element)[0][1];
  if (line.includes("%") && withPercentMorphology.includes(`${result} %`)) {
    return `${result} %`;
  }
  if (result) {
    return result;
  }
};

const findReferenceIndex = (line) => {
  const dataLine = line.replace(/—/g, "-");
  const baseIndex = dataLine
    .split(" ")
    .reduce((val, cur, i) => {
      if (cur.includes("-")) {
        return [...val, i];
      }
      return val;
    }, [])
    .slice(-1)[0];

  return baseIndex;
};

const getValue = (line) => {
  const baseIndex = findReferenceIndex(line);
  const elements = line.split(" ");
  for (let i = baseIndex - 2; i >= 0; i--) {
    if (parseFloat(elements[i].replace(",", ".").replace("<", "").replace(">", ""))) {
      return elements[i].replace(",", ".").replace("<", "").replace(">", "");
    }
  }
};

export const readResults = (data) => {
  const results = data.map((el) => {
    return el.map((line) => {
      const name = getName(line);
      if (name) {
        return {
          name: name,
          value: getValue(line),
        };
      }
    });
  });
  const bloodData = results.map((el) => {
    return el.filter((el) => {
      return el;
    });
  });
  return bloodData;
};
