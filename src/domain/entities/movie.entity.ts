export class Movie {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public duration: number,
    public category: string,
    public releaseDate: Date,
    public rating: number,
  ) {}
}
