export class User {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public displayName: string,
    public phone: string,
    public roles: Array<string>,
    public created: Date,
    public updated?: Date,
    public hasResetInProgress?: boolean,
    public isActive?: boolean,
    public seances?: string[]
  ) { }
}
