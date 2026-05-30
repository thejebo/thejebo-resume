export interface CoverLetterAuthorLink {
  label: string;
  url: string;
}

export interface CoverLetterAuthor {
  name: string;
  title: string;
  location?: string;
  email?: string;
  phone?: string;
  links?: CoverLetterAuthorLink[];
}

export interface CoverLetterData {
  author: CoverLetterAuthor;
  greeting: string;
  opening: string;
  body: string[];
  highlights: string[];
  closing: string;
  signature: string;
}
