export interface Issue {
  number: number;
  title: string;
  assignedTo: string;
  status: string;
  labels: string;
  project: string;
  milestones: string;
}

export interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
}

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: User;
  description: string;
  url: string;
}

export interface CommentGithub {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: User;
  created_at: string;
  updated_at: string;
  author_association: string;
  body: string;
}

export interface Milestone {
  url: string;
  id: number;
  node_id: string;
  state: string;
  title: string;
  description: string;
  creator: User;
  open_issues: number;
  closed_issues: number;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  type: string;
}

export interface Project {
  owner_url: string;
  url: string;
  id: number;
  node_id: string;
  name: string;
  body: string;
  number: number;
  state: string;
}

export interface IssueGithub {
  id: number;
  node_id: string;
  url: string;
  description: string;
  number: number;
  state: string;
  title: string;
  body: string;
  user: User;
  labels: Label[];
  assignee: User;
  assignees: User[];
  milestone: Milestone;
  comments: number;
  closed_at: string;
  created_at: string;
  updated_at: string;
}

export interface AddAccountParams {
  issuesId: number[];
  reposId: number[];
  projectsId: number[];
  hours: number;
  collaboratorId: number;
  pay_by_hours: number;
  pay_to_internet: number;
  internet_cost: number;
  taxes: number;
  details: string;
  payment_comment: string;
  initDate: string;
  endDate: string;
}

export interface UserProfile {
  id: number;
  login: string;
  node_id: string;
  type: string;
  avatar_url: string;
  url: string;
  name: string;
  location: string;
  email: string;
  bio: string;
}

export interface ProductsBill {
  productId: number;
  count: number;
  remove: boolean;
}
