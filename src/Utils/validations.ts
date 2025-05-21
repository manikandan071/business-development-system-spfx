export const validateForm = (formDetails: any, setFormDetails: any) => {
  let isFormValid = true;
  const updatedForm = { ...formDetails };

  Object.keys(updatedForm).forEach((key) => {
    const value = updatedForm[key].value;
    let isValid = true;
    if (typeof value === "string") {
      isValid = value.trim() !== "";
    } else if (Array.isArray(value)) {
      isValid = value.length > 0;
    } else if (typeof value === "number") {
      isValid = value !== null && value !== undefined && value !== 0;
    } else {
      isValid = !!value;
    }

    updatedForm[key].isValid = isValid;

    if (!isValid) {
      isFormValid = false;
    }
  });

  setFormDetails(updatedForm);
  return isFormValid;
};
