export type Lesson = {
  key: string;
  title: string;
  description: string;
};

export type LessonData = {
  initialValue?: string;
  initialFlags?: string;
  safariAccept?: boolean;
  interactive?: boolean;
  regex?: string[];
  flags?: string;
  content: string;
  cursorPosition?: number;
  readOnly?: boolean;
  visibleRegex?: string;
  useFlagsControl?: boolean;
  title: string;
  originalTitle?: string;
  description: string;
  image?: string;
  answer: string[];
  customValidate?: (regex: string) => boolean;
};

export type CheatsheetData = {
  title: string;
  description?: string;
  content: string;
  code: string;
  flags: string;
  regex: string;
};
