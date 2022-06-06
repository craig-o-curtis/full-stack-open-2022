export interface ICoursePart {
  name: string;
  exercises: number;
}

export interface ICourse {
  title: string;
  parts: ICoursePart[];
}
