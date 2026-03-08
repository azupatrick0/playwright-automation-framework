interface BaseUser {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  country?: string;
}

export interface DemoData extends BaseUser {
  company: string;
  goal: string;
}

export interface SignupData extends BaseUser {
  password: string;
}
