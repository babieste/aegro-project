export class Plot {
  public area!: number;
  public maximumNumberOfRecords: number;
  public production: number[] = [];

  constructor(numberOfRecords: number) {
    this.maximumNumberOfRecords = numberOfRecords;
  }
}
