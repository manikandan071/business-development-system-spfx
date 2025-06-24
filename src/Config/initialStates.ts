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
    isMandatory: true,
  },
  Languages: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Region: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Currency: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  TimeZone: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Status: {
    value: "Active",
    isValid: true,
    isMandatory: false,
  },
  Notes: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
  selectedPeople: {
    value: [],
    isValid: true,
    isMandatory: false,
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
  GoogleLocation: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  BrandingPartner: {
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
  UnitSize: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Status: {
    value: "Not Started",
    isValid: true,
    isMandatory: true,
  },
  BreakPermission: {
    value: false,
    isValid: true,
    isMandatory: false,
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
const ObligationFormDetails = {
  Title: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Description: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
  ObligationType: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Priority: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Status: {
    value: "Not Started",
    isValid: true,
    isMandatory: true,
  },
  Party: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Clause: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  StartDate: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  DueDate: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
  Remarks: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
};

const CalenderFormDetails = {
  EventTitle: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Description: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
  EventType: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Category: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Status: {
    value: "Not Started",
    isValid: true,
    isMandatory: true,
  },
  EventDateTime: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Location: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  AssignedTo: {
    value: [],
    isValid: true,
    isMandatory: true,
  },
};

const taskFormDetails = {
  TaskTitle: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Description: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
  Priority: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  AssignedTo: {
    value: [],
    isValid: true,
    isMandatory: true,
  },
  Status: {
    value: "Not Started",
    isValid: true,
    isMandatory: true,
  },
  StartDate: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  DueDate: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  isReminder: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
  isTaskOverdue: {
    value: "",
    isValid: true,
    isMandatory: false,
  },
  ProjectOfTitle: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  ProjectOfID: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
};

const DocumentsFormDetails = {
  Category: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  ContractType: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Party: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Date: {
    value: "",
    isValid: true,
    isMandatory: true,
  },
  Attachments: {
    value: [],
    isValid: true,
    isMandatory: true,
  },
  AttachmentsDeletion: {
    value: [],
    isValid: true,
    isMandatory: false,
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
  BreakPermission: {
    value: false,
    isValid: true,
    isMandatory: false,
  },
};

export {
  tempFormDetails,
  countryFormDetails,
  ProjectFormDetails,
  ObligationFormDetails,
  CalenderFormDetails,
  taskFormDetails,
  DocumentsFormDetails,
};
