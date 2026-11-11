import type {ComponentPropsWithoutRef} from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'>;


function Button(props: ButtonProps) {
    return (
        <button {...props}>
            {props.children}
        </button>
    )
}

export default Button;