import { generateUser, generateCompany } from 'qa-faker-factory';
import { SignupData, DemoData } from 'utils/types';

export async function createTestData(): Promise<{
  signupData: SignupData;
  demoData: DemoData;
}> {
  const companyUser = generateUser({});
  const company = generateCompany({});

  const domain = 'remotetest.com';
  const email = `${companyUser.firstName}.${companyUser.lastName}@${domain}`.toLowerCase();

  const signupData: SignupData = {
    email,
    password: companyUser.password!,
    firstName: companyUser.firstName,
    lastName: companyUser.lastName,
    phone: companyUser.phone,
  };

  let phoneNumber = companyUser.phone.replace(/^\+\d+\s*/, ''); // remove country code

  const demoData: DemoData = {
    ...signupData,
    company: company.name,
    phone: phoneNumber,
    goal: 'Manage and pay contractors',
    country: 'US',
  };

  return { signupData, demoData };
}
