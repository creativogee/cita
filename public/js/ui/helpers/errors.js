export class InvalidReference extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidReference';
  }
}
