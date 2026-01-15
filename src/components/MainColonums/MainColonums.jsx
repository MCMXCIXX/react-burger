import './MainColonums.scss';

const MainColonums = (props) => {
    const {className, children} = props
    return <div className="main-colonums container">{children}</div>;
};

export default MainColonums;