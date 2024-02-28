import './App.css';
import {Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Notfoundpage from "./components/Notfoundpage/Notfoundpage";
import Registration from "./pages/Registration/Registration";
import PersonalAccount from "./pages/PersonalAccount/PersonalAccount";
import PrivateRoute from "./utils/router/privateRoute";
import {useSelector} from "react-redux";
import {selectRegistrationSuccess} from "./redux/slices/registrationSlice";
import {useEffect, useState} from "react";
import EnglishPlug from "./pages/EnglishPlug/EnglishPlug";
import CmsHomepage from "./cms/CmsHomepage/CmsHomepage";
import CmsPrivateRoute from "./utils/router/cmsPrivateRoute";
import {WorkbookAfterPaymentPage} from "./pages/PaymentPages/PaymentPages";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import {PrivacyPolitic, PublicOffer} from "./components/SmallComponents/SmallComponents";


function App() {
    const registrationSuccess = useSelector(selectRegistrationSuccess)
    const [registrSuccess, setRegistrSuccess] = useState(registrationSuccess)
    useEffect(() => {
        setRegistrSuccess(registrationSuccess)
    }, [registrationSuccess])

    return (
        <div>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/lk' element={<PersonalAccount langTestOpen={false}/>} />
                    <Route path='/lk/lvl-test' element={<PersonalAccount langTestOpen={true}/>} />
                    <Route path='/lk2/courses' element={<PersonalAccount/>} />
                    <Route path='/lk2/exercises' element={<PersonalAccount/>} />
                    <Route path='/lk2/workbooks' element={<PersonalAccount/>} />
                    <Route path='/payment/workbook' element={<WorkbookAfterPaymentPage />} />
                </Route>
                <Route element={<CmsPrivateRoute />}>
                    <Route path='/cms' element={<CmsHomepage/>} />
                    <Route path='/cms2/courses' element={<CmsHomepage/>} />
                    <Route path='/cms2/lessons' element={<CmsHomepage/>} />
                    <Route path='/cms2/workbooks' element={<CmsHomepage/>} />
                    <Route path='/cms2/users' element={<CmsHomepage/>} />
                </Route>
                <Route path='/' element={<Homepage booleanModal={false}
                                                   registrSuccess={registrSuccess}
                                                   setRegistrSuccess={setRegistrSuccess}/>} />
                <Route path='/login' element={<Homepage booleanModal={true}
                                                        langTestOpen={false}
                                                        registrSuccess={registrSuccess}
                                                        setRegistrSuccess={setRegistrSuccess}/>} />
                <Route path='/login/lvl-test' element={<Homepage booleanModal={true}
                                                        langTestOpen={true}
                                                        registrSuccess={registrSuccess}
                                                        setRegistrSuccess={setRegistrSuccess}/>} />

                <Route path='/registration' element={<Registration registrSuccess={registrSuccess} setRegistrSuccess={setRegistrSuccess}
                                                                   langTestOpen={false}/>} />
                <Route path='/registration/lvl-test' element={<Registration registrSuccess={registrSuccess} setRegistrSuccess={setRegistrSuccess}
                                                                            langTestOpen={true}/>} />
                <Route path='/en' element={<EnglishPlug />} />
                <Route path='/contacts' element={<ContactsPage />} />
                <Route path='/contacts/payment_problem' element={<ContactsPage defaultTopic={'payment_problem'} />} />
                <Route path='/contacts/answer' element={<ContactsPage defaultTopic={'answer'} />} />
                <Route path='/privet' element={<PrivacyPolitic />} />
                <Route path='/oferta' element={<PublicOffer />} />
                <Route path='*' element={<Notfoundpage/>} />
            </Routes>
        </div>

    );
}

export default App;
