import {Navbar} from '../components/Navbar'

export const Layout = (props) => {
    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    );
}