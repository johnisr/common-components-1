export const getAllFilterInputs = (filters) => {
  const filterPillbox = {};

  Object.keys(filters).map((key) => {
    const inputs = filters[key]?.inputs ?? [];
    if (inputs.length > 0) {
      filterPillbox[key] = inputs;
    }
  });

  return filterPillbox;
};

export const clearAllInputs = (filterDropdowns) => {
  const updatedFilterDropdowns = { ...filterDropdowns };

  Object.keys(updatedFilterDropdowns).map((key) => {
    updatedFilterDropdowns[key].inputs = [];
  });

  return updatedFilterDropdowns;
};
