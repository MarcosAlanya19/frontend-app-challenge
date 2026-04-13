import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthUser } from "@/stores/use-auth-store";

const KEY = "mock_db_users";

export interface MockUser extends AuthUser {
  email: string;
  password: string;
}

const SEED_USERS: MockUser[] = [
  {
    email: "marcos@gmail.com",
    password: "123456",
    fullName: "Marcos Alanya",
    documentType: "DNI",
    documentNumber: "74845954",
    phone: "987654321",
    birthDate: "15/06/1990",
  },
];

async function getAll(): Promise<MockUser[]> {
  const raw = await AsyncStorage.getItem(KEY);
  const stored: MockUser[] = raw ? JSON.parse(raw) : [];
  return [...SEED_USERS, ...stored];
}

export async function saveUser(user: MockUser): Promise<void> {
  const raw = await AsyncStorage.getItem(KEY);
  const stored: MockUser[] = raw ? JSON.parse(raw) : [];
  const exists = stored.findIndex((u) => u.email === user.email);
  if (exists >= 0) {
    stored[exists] = user;
  } else {
    stored.push(user);
  }
  await AsyncStorage.setItem(KEY, JSON.stringify(stored));
}

export async function findUserByCredentials(
  email: string,
  password: string,
): Promise<MockUser | null> {
  const users = await getAll();
  return (
    users.find((u) => u.email === email && u.password === password) ?? null
  );
}

export async function existsByDocument(
  documentType: string,
  documentNumber: string,
): Promise<boolean> {
  const users = await getAll();
  return users.some(
    (u) =>
      u.documentType === documentType && u.documentNumber === documentNumber,
  );
}

export async function existsByPhone(phone: string): Promise<boolean> {
  const users = await getAll();
  return users.some((u) => u.phone === phone);
}

export async function existsByEmail(email: string): Promise<boolean> {
  const users = await getAll();
  return users.some((u) => u.email === email);
}
