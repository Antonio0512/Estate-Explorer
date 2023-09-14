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
import {AuthRouteGuard} from "./routeGuards/authRouteGuard";
import {NoAuthRouteGuard} from "./routeGuards/noAuthRouteGuard";
import {ListingProvider} from "./contexts/listingContext";
import {RealtorProvider} from "./contexts/realtorContext";

function App() {
    return (
        <AuthProvider>
            <ListingProvider>
                <RealtorProvider>
                    <Layout>
                        <Routes>
                            <Route path='/' element={<Home/>}/>

                            <Route element={<NoAuthRouteGuard/>}>
                                <Route path='/signup' element={<SignUp/>}/>
                                <Route path='/signin' element={<SignIn/>}/>
                            </Route>

                            <Route path='/about' element={<About/>}/>
                            <Route path='/contact' element={<Contact/>}/>
                            <Route path='/listings' element={<Listings/>}/>

                            <Route element={<AuthRouteGuard/>}>
                                <Route path='/listings/:slug' element={<ListingDetails/>}/>
                            </Route>

                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </Layout>
                </RealtorProvider>
            </ListingProvider>
        </AuthProvider>
    );
}

export default App;
