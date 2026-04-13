import './UiMessage.scss'

interface UiMessageProps {
    text: string;
    className?: string;
}

const UiMessage = (props: UiMessageProps) => {
    const {text, className} = props;
    return (
        <div className={`uiMessage ${className}`}>
            <p className="ui-message__text">
                {text}
            </p>
        </div>
    )
}

export default UiMessage
