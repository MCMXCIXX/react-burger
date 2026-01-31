import './UiMessage.scss'

const UiMessage = (props) => {
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