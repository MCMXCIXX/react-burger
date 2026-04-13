import './MenuButton.scss';

interface MenuButtonProps {
    className?: string;
    href?: string;
    icon?: React.ReactNode;
    text: string;
    type?: "button" | "submit" | "reset";
    target?: "_self" | "_blank";
    title: string;
    disabledPadding?: boolean;

}

const MenuButton = (props: MenuButtonProps) => {
    const {
        className,
        href,
        icon,
        text,
        type='button',
        target = '_self',
        title,
        disabledPadding = false,
    } = props

    const isLink = href !== undefined;
    const Component = isLink ? "a" : "button"
    const linkProps = {href, target}
    const buttonProps = {type}
    const specificProps = isLink ? linkProps : buttonProps
    return (
        <Component className={`menu-button ${!disabledPadding ? 'p-4' : ''} ${className}`}
                   title={title}
                   aria-label={title}
                   {...specificProps}
        >
            {(icon && icon)}
            <span className="text text_type_main-default">{text}</span>

        </Component>
    )
};

export default MenuButton;
