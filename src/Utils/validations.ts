/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const validateForm = (
  formDetails: any,
  setFormDetails: any,
  manageAccess: any
) => {
  let isFormValid = true;
  const updatedForm = { ...formDetails };

  // Validate normal fields (excluding manageAccess or similar arrays)
  Object.keys(updatedForm).forEach((key) => {
    if (key === "manageAccess") return;

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
    if (!isValid) isFormValid = false;
  });

  // Handle manageAccess separately
  if (Array.isArray(updatedForm.manageAccess?.value)) {
    let manageAccessValid = true;

    const updatedManageAccess = updatedForm.manageAccess.value.map(
      (row: any) => {
        const updatedRow: any = {};
        let rowIsValid = true;

        Object.keys(row).forEach((fieldKey) => {
          const fieldValue = row[fieldKey].value;
          let isValid = true;

          if (typeof fieldValue === "string") {
            isValid = fieldValue.trim() !== "";
          } else if (Array.isArray(fieldValue)) {
            isValid = fieldValue.length > 0;
          } else if (typeof fieldValue === "number") {
            isValid =
              fieldValue !== null &&
              fieldValue !== undefined &&
              fieldValue !== 0;
          } else {
            isValid = !!fieldValue;
          }

          if (!isValid) {
            rowIsValid = false;
            isFormValid = false;
          }

          updatedRow[fieldKey] = {
            ...row[fieldKey],
            isValid,
          };
        });

        if (!rowIsValid) {
          manageAccessValid = false;
        }

        return updatedRow;
      }
    );

    updatedForm.manageAccess = {
      ...updatedForm.manageAccess,
      value: updatedManageAccess,
      isValid: manageAccessValid,
    };
  }

  setFormDetails(updatedForm);
  return isFormValid;
};

export const rowValidateFunction = (
  formDetails: any[],
  setFormDetails: any,
  onchange?: any
) => {
  let isFormValid = true;

  const updatedFormDetails = formDetails.map((row) => {
    const updatedRow: any = {};

    Object.keys(row).forEach((key) => {
      const value = row[key].value;
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

      if (!isValid) {
        isFormValid = false;
      }

      updatedRow[key] = {
        ...row[key],
        isValid,
      };
    });

    return updatedRow;
  });

  setFormDetails(updatedFormDetails);
  if (onchange) {
    onchange(updatedFormDetails);
  }
  return isFormValid;
};
