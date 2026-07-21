export interface LobbyMember {
  name: string;
  avatar: string;
  isAdmin?: boolean;
  status: "joined" | "pending";
}

export interface MemberStatusRowProps {
  member: LobbyMember;
}
