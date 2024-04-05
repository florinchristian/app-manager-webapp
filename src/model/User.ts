import Role from "./Role";

type User = {
    id: bigint;
    email: string;
    role: Role;
}

export default User;
