import './MainColumns.scss';

const MainColumns = (props) => {
    const {className, children} = props
    return <div className="main-colonums container">{children}</div>;
};

export default MainColumns;