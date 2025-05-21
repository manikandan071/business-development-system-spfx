export const onChangeFunction = (
  fieldName: string,
  value: any,
  setFormDetails: any
) => {
  setFormDetails((prev: any) => ({
    ...prev,
    [fieldName]: {
      ...prev[fieldName],
      value: value,
      isValid: true, // reset validation on change
    },
  }));
};

export const rowOnChangeFunction = (
  fieldName: string,
  value: any,
  setFormDetails: any,
  index: number
) => {
  setFormDetails((prevState: any) => {
    const updatedState = [...prevState];
    updatedState[index] = {
      ...updatedState[index],
      [fieldName]: value,
    };
    return updatedState;
  });
};
