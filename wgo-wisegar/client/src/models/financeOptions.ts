export interface IOptionFilter {
  id: number;
  title: string;
}

export interface ICollaboratorOption {
  id: number;
  id_github: number;
  card_number: number;
  pay_by_hours: number;
  login: string;
  node_id: string;
  type: string;
  avatar_url: string;
  url: string;
  name: string;
  location: string;
  email: string;
  bio: string;
  address: string;
  cap: string;
  place: string;
}
