export interface QuestionType {
    title: string;
    description: JSX.Element;
}

export interface QuestionSectionType {
    section: string;
    panels: Array<QuestionType>;
}