import search, {Category} from './search';
import mockAxios from 'jest-mock-axios';

const tickets = [{
  "_id": "1a227508-9f39-427c-8f57-1b72f3fab87c",
  "url": "http://initech.zendesk.com/api/v2/tickets/1a227508-9f39-427c-8f57-1b72f3fab87c.json",
  "external_id": "3e5ca820-cd1f-4a02-a18f-11b18e7bb49a",
  "created_at": "2016-04-14T08:32:31 -10:00",
  "type": "incident",
  "subject": "A Catastrophe in Micronesia",
  "description": "Aliquip excepteur fugiat ex minim ea aute eu labore. Sunt eiusmod esse eu non commodo est veniam consequat.",
  "priority": "low",
  "status": "hold",
  "submitter_id": 71,
  "assignee_id": 38,
  "organization_id": 112,
  "tags": [
    "Puerto Rico",
    "Idaho",
    "Oklahoma",
    "Louisiana"
  ],
  "has_incidents": false,
  "due_at": "2016-08-15T05:37:32 -10:00",
  "via": "chat"
}];

const users = [{
  "_id": 38,
  "url": "http://initech.zendesk.com/api/v2/users/1.json",
  "external_id": "74341f74-9c79-49d5-9611-87ef9b6eb75f",
  "name": "Francisca Rasmussen",
  "alias": "Miss Coffey",
  "created_at": "2016-04-15T05:19:46 -10:00",
  "active": true,
  "verified": true,
  "shared": false,
  "locale": "en-AU",
  "timezone": "Sri Lanka",
  "last_login_at": "2013-08-04T01:03:27 -10:00",
  "email": "coffeyrasmussen@flotonic.com",
  "phone": "8335-422-718",
  "signature": "Don't Worry Be Happy!",
  "organization_id": 112,
  "tags": [
    "Springville",
    "Sutton",
    "Hartsville/Hartley",
    "Diaperville"
  ],
  "suspended": true,
  "role": "admin"
}];

const organizations = [{
  "_id": 112,
  "url": "http://initech.zendesk.com/api/v2/organizations/101.json",
  "external_id": "9270ed79-35eb-4a38-a46f-35725197ea8d",
  "name": "Enthaze",
  "domain_names": [
    "kage.com",
    "ecratic.com",
    "endipin.com",
    "zentix.com"
  ],
  "created_at": "2016-05-21T11:10:28 -10:00",
  "details": "MegaCorp",
  "shared_tickets": false,
  "tags": [
    "Fulton",
    "West",
    "Rodriguez",
    "Farley"
  ]
}];

describe('search', () => {

  beforeEach(() => {
    search.tickets = tickets;
    search.organizations = organizations;
    search.users = users;
  });

  afterEach(() => {
    search.tickets = [];
    search.organizations = [];
    search.users = [];
    mockAxios.reset();
  });

  describe('getDataForCategory', () => {
    it('should return tickets data for ticket category', () => {
      expect(search.getDataForCategory(Category.tickets)).toEqual(tickets);
    });

    it('should return orgs data for organizations category', () => {
      expect(search.getDataForCategory(Category.organizations)).toEqual(organizations);
    });

    it('should return users data for users category', () => {
      expect(search.getDataForCategory(Category.users)).toEqual(users);
    });

    it('throws UnreachableCaseError if unknown category given', () => {
      expect(() => { search.getDataForCategory('blargh') }).toThrow();
    });
  });

  describe('getFieldsForCategory', () => {

    it('should return all non-boolean fields for users', () => {
      expect(search.getFieldsForCategory(Category.users)).toEqual(['_id', 'alias', 'created_at', 'email',  'external_id',  'last_login_at',
      'locale', 'name', 'organization_id',  'phone',  'role', 'signature',  'tags', 'timezone','url']);
    });

    it('should return empty array if no data exists found', () => {
      search.tickets = [];
      expect(search.getFieldsForCategory(Category.tickets)).toEqual([]);
    });

    it('throws UnreachableCaseError if unknown category given', () => {
      expect(() => { search.getFieldsForCategory('blargh') }).toThrow();
    });
  });

  describe('addRelatedData', () => {
    it('should add organization if data has organization_id', () => {
      const results = search.addRelatedData(tickets);
      expect(results[0].organization).toEqual(organizations[0]);
    });

    it('should add user if data has assignee_id', () => {
      const results = search.addRelatedData(tickets);
      expect(results[0].user).toEqual(users[0]);
    });

    it('should return original data if no related data found', () => {
      const results = search.addRelatedData([{ dog: true }]);
      expect(results).toEqual([{ dog: true }]);
    });

    it('should throw error if array not given', () => {
      expect(() => { search.addRelatedData('pizza') }).toThrow();
    });
  });

  describe('search', () => {
    it('should return result from fuse search', () => {
      const results = search.search(Category.tickets, 'subject', 'korea');
      expect(results).toEqual(tickets);
    });

    it('should throw error if category or field is not set', () => {
      expect(() => { search.search() }).toThrow('required');
    });

  });

  describe('loadTickets', () => {
    it('should load ticket results', async () => {
      const promise = search.loadTickets();
      mockAxios.mockResponse({data: tickets});
      const data = await promise;
      expect(mockAxios.get).toHaveBeenCalledWith('/assets/data/tickets.json');
      expect(data).toEqual(tickets);
    });
  });

  describe('loadOrganizations', () => {
    it('should load organization results', async () => {
      const promise = search.loadOrganizations();
      mockAxios.mockResponse({data: organizations});
      const data = await promise;
      expect(mockAxios.get).toHaveBeenCalledWith('/assets/data/organizations.json');
      expect(data).toEqual(organizations);
    });
  });

  describe('loadUsers', () => {
    it('should load ticket results', async () => {
      const promise = search.loadUsers();
      mockAxios.mockResponse({data: users});
      const data = await promise;
      expect(mockAxios.get).toHaveBeenCalledWith('/assets/data/users.json');
      expect(data).toEqual(users);
    });
  });

});
