export default interface UserType {
  _id: string;
  firstName: string;
  lastName?: string;
  profileImageUrl?: string;
  status: "pending" | "active" | "inactive" | "deleted";
  fullName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  role: [string];
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}
