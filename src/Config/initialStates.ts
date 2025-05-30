const tempFormDetails = {
  CountryName: {
    value: "",
    isValid: true,
  },
  TypeOfCountry: {
    value: "",
    isValid: true,
  },
  AutoSelect: {
    value: "",
    isValid: true,
  },
  AutoSelectId: {
    value: null,
    isValid: true,
  },
  Number: {
    value: null,
    isValid: true,
  },
  SelectDate: {
    value: null,
    isValid: true,
  },
  selectedPeople: {
    value: [],
    isValid: true,
  },
  manageAccess: {
    value: [
      {
        User: {
          value: [],
          isValid: true,
        },
        Permission: {
          value: "",
          isValid: true,
        },
      },
    ],
    isValid: true,
  },
};

const countryFormDetails = {
  CountryName: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  CountryISOCode: {
    value: "",
    isValid: true,
    isMandatory: true
  },
  Languages: {
    value: "",
    isValid: true,
    isMandatory: true
  },
  Region: {
    value: "",
    isValid: true,
    isMandatory: true
  },
  Currency: {
    value: "",
    isValid: true,
    isMandatory: true
  },
  TimeZone: {
    value: "",
    isValid: true,
    isMandatory: true
  },
  Status: {
    value: "Active",
    isValid: true,
    isMandatory: true
  },
  Notes: {
    value: "",
    isValid: true,
    isMandatory: false
  },
  selectedPeople: {
    value: [],
    isValid: true,
    isMandatory: true
  },
  ManageAccess: {
    value: [
      {
        User: {
          value: [],
          isValid: true,
          isMandatory: true
        },
        Permission: {
          value: "",
          isValid: true,
          isMandatory: true
        },
      },
    ],
    isValid: true,
  },
};

const ProjectFormDetails = {
  ProjectName: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Description: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
  ProjectType: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Country: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  CountryId: {
    value: null,
    isValid: true,
    isMandatory: true,
  },
  City: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  StartDate: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  EndDate: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  ManageAccess: {
    value: [
      {
        User: {
          value: [],
          isValid: true,
          isMandatory: true,
        },
        Permission: {
          value: "",
          isValid: true,
          isMandatory: true,
        },
      },
    ],
    isValid: true,
  },
};

export { tempFormDetails, countryFormDetails, ProjectFormDetails };
