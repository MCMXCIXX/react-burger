import './MainСolumns.scss';

const MainСolumns = (props) => {
    const {className, children} = props
    return <div className="main-colonums container">{children}</div>;
};

export default MainСolumns;