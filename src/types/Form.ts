export  type FieldLoginType = {
    username?: string;
    password?: string;
    remember?: string;
};
  
export  type FieldReqType = {
    username?: string;
    password?: string;
    comfirmPassword?: string;
};
  
export interface CreatFormValues {
    title: string;
    description: string;
    modifier: string;
}
  
 export interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: CreatFormValues) => void;
    onCancel: () => void;
}
  
export interface AreaOption {
    value: string;
    label: string;
    children?: AreaOption[];
  }