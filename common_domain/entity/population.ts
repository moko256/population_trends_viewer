type PopulationCompositions = PopulationCompositionData[];

type PopulationCompositionData = {
  label: string;
  data: PopulationValue[];
};

type PopulationValue = {
  year: number;
  value: number;
};
