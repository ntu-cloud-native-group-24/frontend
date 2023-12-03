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
    setImageSrcMain: React.Dispatch<React.SetStateAction<string>>;
    setFoodNameMain: React.Dispatch<React.SetStateAction<string>>;
    setFoodDescriptionMain: React.Dispatch<React.SetStateAction<string>>;
    setFoodPriceMain: React.Dispatch<React.SetStateAction<number>>;
    setFoodStatusMain: React.Dispatch<React.SetStateAction<boolean>>;
    setFoodTagListMain: React.Dispatch<React.SetStateAction<string[]>>;
    setFullTagListMain: React.Dispatch<React.SetStateAction<string[]>>;
    SingleFormMain: FormInstance<FormInstance<object>>;
    MultipleFormMain: FormInstance<FormInstance<object>>;
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