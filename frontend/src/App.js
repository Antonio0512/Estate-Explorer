import {Route, Routes} from "react-router-dom";
import {Home} from './containers/Home';
import {About} from './containers/About';
import {Contact} from './containers/Contact';
import {Listings} from './containers/Listings';
import {ListingDetails} from './containers/ListingDetails';
import {SignUp} from './containers/SignUp';
import {SignIn} from './containers/SignIn';
import {NotFound} from "./components/NotFound";
import {Layout} from './hocs/Layout';

import "./sass/main.scss";
import {AuthProvider} from "./contexts/authContext";
import {AlertProvider} from "./contexts/alertContext";

function App() {
    return (
        <AuthProvider>
            <AlertProvider>
                <Layout>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/contact' element={<Contact/>}/>
                        <Route path='/listings' element={<Listings/>}/>
                        <Route path='/listings/:id' element={<ListingDetails/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='/signin' element={<SignIn/>}/>

                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Layout>
            </AlertProvider>
        </AuthProvider>
    );
}

export default App;
