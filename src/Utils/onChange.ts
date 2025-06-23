/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
  index: number,
  onChange?: any
) => {
  setFormDetails((prevState: any) => {
    const updatedState = [...prevState];
    updatedState[index] = {
      ...updatedState[index],
      [fieldName]: {
        ...updatedState[index][fieldName],
        value: value, // or just `value` shorthand in modern JS
        isValid: true, // reset validation on change
      },
    };
    if (onChange) {
      onChange(updatedState, false);
    }
    return updatedState;
  });
};
