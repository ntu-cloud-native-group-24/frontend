import { FoodMultipleSelectionType, FoodSingleSelectionType, FoodType } from "./FoodInterface";
import type { FormInstance } from "antd/lib";
export enum ModalType {
    NEW,
    EDIT,
}

export interface MyModalProps {
    food: FoodType;
    tagList: (string)[];
    type: ModalType;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MyTagProps {
    tagList: (string)[];
    fullTagList: (string)[];
    setFullTagList: React.Dispatch<React.SetStateAction<string[]>>;
    setTagList: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface SingleSelectionsProps {
    form: FormInstance<object>;
    singleSelections: Array<FoodSingleSelectionType>;
}

export interface MultipleSelectionsProps {
    form: FormInstance<object>;
    multipleSelections: Array<FoodMultipleSelectionType>;
}