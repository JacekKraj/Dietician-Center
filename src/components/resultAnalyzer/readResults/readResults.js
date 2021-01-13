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

export const namesUnits = ["tys/µl", "mln/µl", "g/dl", "%", "fl", "pg"];

export const withPercentMorphology = ["Neutrofile %", "Limfocyty %", "Monocyty %", "Eozynofile %", "Bazofile %"];

const fuzyMorphology = FuzzySet(namesMorphology);
const fuzyUnits = FuzzySet(namesUnits);

const SIMILIARITYTHERESHOLD = 0.6;

const getName = (line) => {
  const element = line.split(" ")[0];
  const result = fuzyMorphology.get(element) && fuzyMorphology.get(element)[0][0] > SIMILIARITYTHERESHOLD && fuzyMorphology.get(element)[0][1];
  if ((line.includes("%") || line.includes("Y")) && withPercentMorphology.includes(`${result} %`)) {
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

const getNormAndUnit = (line) => {
  const elements = line.split(" ");
  const element = line.split(" ")[0];
  const result = fuzyMorphology.get(element) && fuzyMorphology.get(element)[0][0] > SIMILIARITYTHERESHOLD && fuzyMorphology.get(element)[0][1];
  if (result) {
    const lastEl = elements[elements.length - 1];
    (lastEl.includes("L") || lastEl.includes("H")) && elements.pop();
    const baseIndex = findReferenceIndex(line);
    let norm, unit;
    if (baseIndex === elements.length - 1) {
      if (elements[baseIndex][0] === "-") {
        norm = `${elements[baseIndex - 1]}${elements[baseIndex]}`;
        unit = elements[baseIndex - 2];
      } else {
        norm = elements[baseIndex];
        unit = elements[baseIndex - 1];
      }
    } else if (baseIndex === elements.length - 2) {
      if (elements[baseIndex][0] === "-") {
        norm = `${elements[baseIndex - 1]}${elements[baseIndex]}${elements[baseIndex + 1]}`;
        unit = elements[baseIndex - 2];
      } else {
        norm = `${elements[baseIndex]}${elements[baseIndex + 1]}`;
        unit = elements[baseIndex - 1];
      }
    }

    return [norm.replace(/\,/g, "."), unit.replace("*", "")];
  } else {
    return [null, null];
  }
};

// const getUnit = (line) => {
//   const baseIndex = findReferenceIndex(line);
//   const elements = line.split(" ");
//   console.log(elements);
//   const unitReplaced = elements[2].replace("*", "");
//   const unit = fuzyUnits.get(unitReplaced);
//   const unitToReturn = unit ? unit[0][1] : "%";
//   return unitToReturn;
// };

// const getNorm = (line) => {
//   const elements = line.split(" ");
//   const norm = elements.filter((el, index) => {
//     return index > 2;
//   });
//   const normJoined = norm.join("");
//   return normJoined.replace(",", ".");
// };
export const readResults = (data) => {
  const results = data.map((el) => {
    return el.map((line) => {
      const name = getName(line);
      const [norm, unit] = getNormAndUnit(line);
      if (unit) {
        let unitAfterFuzy = fuzyUnits.get(unit);
        unitAfterFuzy = unitAfterFuzy ? unitAfterFuzy[0][1] : "%";
        if ((name, norm, unitAfterFuzy)) {
          return {
            name: name,
            value: getValue(line),
            unit: unitAfterFuzy,
            norm: norm,
          };
        }
      }
    });
  });
  const bloodData = results.map((el) => {
    return el.filter((el) => {
      return el;
    });
  });
  console.log(bloodData, "BLOod data");
  return bloodData;
};
