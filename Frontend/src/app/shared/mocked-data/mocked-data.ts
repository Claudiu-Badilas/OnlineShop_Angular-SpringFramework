import { User } from 'src/app/models/user';

export const USER: User = {
  id: '1',
  firstName: 'Test',
  lastName: 'Test',
  email: 'admin',
  username: 'admin',
  profileImageUrl: 'http://localhost:8080/user/image/profile/admin',
  lastLoginDate: '2021-08-31T18:57:40.000+00:00',
  lastLoginDateDisplay: '2021-08-29T18:20:15.000+00:00',
  joinDate: '2021-08-29T18:20:10.000+00:00',
  role: 'ROLE_ADMIN',
  authorities: ['user:read'],
  active: true,
  notLocked: true,
};
