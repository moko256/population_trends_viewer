export type PopulationCompositions = PopulationCompositionData[];

export type PopulationCompositionData = {
  label: string;
  data: PopulationValue[];
};

export type PopulationValue = {
  year: number;
  value: number;
};
