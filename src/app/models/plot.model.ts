export class Plot {
  public area!: number;
  public maximumNumberOfRecords: number;
  public production: number[] = [];
  public plotProductivity: number = 0;

  constructor(numberOfRecords: number) {
    this.maximumNumberOfRecords = numberOfRecords;
  }

}
