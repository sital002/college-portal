export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  address: string;
  birthDate: string;
  avatar: string;
  occupation: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}
