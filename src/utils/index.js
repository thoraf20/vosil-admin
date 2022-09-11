
export const savingsFilter = [
  {
    value: 'pageNo',
    label: 'Page No',
  },
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'accountNumber',
    label: 'Account Number',
  },
  {
    value: 'postedBy',
    label: 'Posted By',
  },
  {
    value: 'accountOfficer',
    label: 'Account Officer',
  },
  {
    value: 'date',
    label: 'Date',
  },
];

export const customerFilter = [
  {
    value: 'accountOfficer',
    label: 'Acc Offcier',
  },
  {
    value: 'surName',
    label: 'Sur Name',
  },
  {
    value: 'otherNames',
    label: 'Other Names',
  },
  {
    value: 'category',
    label: 'Category',
  },
  {
    value: 'residentialAddress',
    label: 'Address',
  },
  {
    value: 'phoneNumber',
    label: 'Phone Number',
  },
  {
    value: 'accountNumber',
    label: 'Account Number',
  },
  {
    value: 'accountBalance',
    label: 'Account Balance',
  },
];

export const accounts = [
  {
    value: 'interim',
    label: 'interim',
  },
  {
    value: 'fixed',
    label: 'fixed',
  },
];

export const roles = [
  {
    value: 'admin',
    label: 'admin',
  },
  {
    value: 'accountOfficer',
    label: 'accountOfficer',
  },
  {
    value: 'customerService',
    label: 'customerService',
  },
  {
    value: 'headOfOperation',
    label: 'headOfOperation',
  },
  {
    value: 'loanOfficer',
    label: 'loanOfficer',
  },
];

export const maritalStatus = [
  {
    value: 'single',
    label: 'single',
  },
  {
    value: 'married',
    label: 'married',
  },
];

export const genders = [
  {
    value: 'male',
    label: 'male',
  },
  {
    value: 'female',
    label: 'female',
  },
];

export const nationality = [
  {
    value: 'Nigeria',
    label: 'Nigeria',
  },
  {
    value: 'Ghana',
    label: 'Ghana',
  },
];

export const states = [
  {
    value: 'lagos',
    label: 'lagos',
  },
  {
    value: 'ogun',
    label: 'ogun',
  },
];

export const employment = [
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'No',
    label: 'No',
  },
];

export const alerts = [
  {
    value: 'every transaction',
    label: 'every transaction',
  },
  {
    value: 'weekly',
    label: 'weekly',
  },
  {
    value: 'monthly',
    label: 'monthly',
  },
];

export const durations = [
  {
    value: 20,
    label: '20 days',
  },
  {
    value: 30,
    label: '1 month',
  },
  {
    value: 60,
    label: '2 months',
  },
];

export const formatCurrency = (value, currency = 'NGN') =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
  }).format(value)