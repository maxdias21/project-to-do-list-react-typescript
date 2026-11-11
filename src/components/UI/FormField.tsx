import type {ComponentPropsWithoutRef} from "react";

type FormFieldProps = ComponentPropsWithoutRef<'input'> & {
    id: string;
    labelValue: string;
}

export default function FormField({labelValue,id, children, ...rest}: FormFieldProps) {
    return (
        <>
            <label htmlFor={id}>{children}{labelValue}</label>
            <input  id={id} {...rest} />
        </>
    )
}