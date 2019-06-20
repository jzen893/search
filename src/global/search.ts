import axios from 'axios';
import Fuse from 'fuse.js';
import {UnreachableCaseError} from "./errors";

export enum Category {
  tickets = 'tickets',
  users = 'users',
  organizations = 'organizations'
}

export interface IUser {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  alias: string;
  created_at: string;
  active: boolean;
  verified: boolean;
  shared: boolean;
  locale: string;
  timezone: string;
  last_login_at: string;
  email: string;
  phone: string;
  signature: string;
  organization_id: number;
  tags?: (string)[] | null;
  suspended: boolean;
  role: string;
}

export interface ITicket {
  _id: string;
  url: string;
  external_id: string;
  created_at: string;
  type: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  submitter_id: number;
  assignee_id: number;
  organization_id: number;
  tags?: (string)[] | null;
  has_incidents: boolean;
  due_at: string;
  via: string;
}

export interface IOrganization {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  domain_names?: (string)[] | null;
  created_at: string;
  details: string;
  shared_tickets: boolean;
  tags?: (string)[] | null;
}



export class Search {

  tickets: ITicket[];

  organizations: IOrganization[];

  users: IUser[];

  async loadData(): Promise<void> {
    this.tickets = await this.loadTickets();
    this.organizations = await this.loadOrganizations();
    this.users = await this.loadUsers();
  }

  getDataForCategory(category: Category): ITicket[] | IUser[] | IOrganization[] {
    switch(category) {
      case Category.tickets:
        return this.tickets;
      case Category.users:
        return this.users;
      case Category.organizations:
        return this.organizations;
      default:
        throw new UnreachableCaseError(category);
    }
  }

  getFieldsForCategory(category: Category): string[] {
    const data = this.getDataForCategory(category);
    if (data.length > 0) {
      return Object.keys(data[0]).sort((a, b) => {
        return a.localeCompare(b);
      });
    }
    return [];
  }

  addRelatedData(data: any[]) {
    return data.map((item) => {
      if (item.hasOwnProperty('organization_id')) {
        const org = this.organizations.find(function(org) {
          return org._id === item.organization_id;
        });
        if (org) {
          item.organization = org;
        }
      }
      if (item.hasOwnProperty('assignee_id')) {
        const user = this.users.find(function(user) {
          return user._id === item.assignee_id;
        });
        if (user) {
          item.user = user;
        }
      }
      return item;
    });
  }

  search(category: Category, field: string, term: string): ITicket[] | IUser[] | IOrganization[] {

    if (!category || !field) {
      throw new Error('category and field are required to perform search');
    }

    const options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        field
      ]
    };

    const list: any[] = this.getDataForCategory(category);
    const fuse = new Fuse(list, options);
    return fuse.search(term) as any;
  }

  async loadTickets(): Promise<ITicket[]> {
    return await axios.get('/assets/data/tickets.json')
      .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  async loadOrganizations(): Promise<IOrganization[]> {
    return await axios.get('/assets/data/organizations.json').then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async loadUsers(): Promise<IUser[]> {
    return await axios.get('/assets/data/users.json').then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default new Search();
