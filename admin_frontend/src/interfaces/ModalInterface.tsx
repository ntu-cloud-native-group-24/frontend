import { FoodCategory, FoodType, FoodSelectionItem } from "./FoodInterface";
import type { FormInstance } from "antd/lib";
export enum ModalType {
    NEW,
    EDIT,
}

export interface MyModalProps {
    food: FoodType;
    tagList: (FoodCategory)[];
    type: ModalType;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchMeals: () => Promise<void>;
}

export interface MyTagProps {
    tagList: (FoodCategory)[];
}

export interface SingleSelectionsProps {
    form: FormInstance<object>;
    singleSelections: Array<FoodSelectionItem>;
}

export interface MultipleSelectionsProps {
    form: FormInstance<object>;
    multipleSelections: Array<FoodSelectionItem>;
}