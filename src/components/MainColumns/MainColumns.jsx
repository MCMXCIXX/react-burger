import './MainColumns.scss';

const MainColumns = (props) => {
    const {children} = props
    return <div className="main-colonums container">{children}</div>;
};

export default MainColumns;