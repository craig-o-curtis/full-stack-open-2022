export interface ICoursePart {
  id: number;
  name: string;
  exercises: number;
}

export interface ICourse {
  id: number;
  title: string;
  parts: ICoursePart[];
}
