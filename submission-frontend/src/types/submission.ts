export interface Submission {
  id: number;
  name: string;
  email: string;
  number: string;
  message: string;
  document_url: string | null;
}

export interface EditPageProps {
  params: {
    id: string;
  };
}
