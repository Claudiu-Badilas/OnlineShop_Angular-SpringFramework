export class User {
  public id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public lastLoginDate: any;
  public lastLoginDateDisplay: any;
  public joinDate: any;
  public profileImageUrl: string;
  public active: boolean;
  public notLocked: boolean;
  public role: string;
  public authorities: string[];

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.lastLoginDate = null;
    this.lastLoginDateDisplay = null;
    this.joinDate = null;
    this.profileImageUrl = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
