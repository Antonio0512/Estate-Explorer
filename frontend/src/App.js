import {Route, Routes} from "react-router-dom";
import {Home} from './containers/Home';
import {About} from './containers/About';
import {Contact} from './containers/Contact';
import {ListingDetails} from './containers/ListingDetails';
import {SignUp} from './containers/SignUp';
import {SignIn} from './containers/SignIn';
import {NotFound} from "./components/NotFound";
import {Layout} from './hocs/Layout';
import {Realtors} from './containers/Realtors'
import "./sass/main.scss";
import {AuthProvider} from "./contexts/authContext";
import {AuthRouteGuard} from "./routeGuards/authRouteGuard";
import {NoAuthRouteGuard} from "./routeGuards/noAuthRouteGuard";
import {ListingProvider} from "./contexts/listingContext";
import {RealtorProvider} from "./contexts/realtorContext";
import {RealtorDetails} from "./containers/RealtorDetails";

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

                            <Route path='/realtors' element={<Realtors/>}/>
                            <Route path='/about' element={<About/>}/>
                            <Route path='/contact' element={<Contact/>}/>

                            <Route element={<AuthRouteGuard/>}>
                                <Route path='/listings/:slug' element={<ListingDetails/>}/>
                                <Route path='/realtors/:id' element={<RealtorDetails/>}/>
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
