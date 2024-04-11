import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Common/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import Dashboard from "./Pages/Dashboard";
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourses";
import PurchaseHistory from "./Components/Core/Dashboard/PurchaseHistory";
import Settings from "./Components/Core/Dashboard/Settings/index";
import Cart from "./Components/Core/Dashboard/Cart";
import { ACCOUNT_TYPE }  from "./Utils/Constants";
import { useSelector } from "react-redux";
import MyCourses from "./Components/Core/Dashboard/MyCourses";
import AddCourse from "./Components/Core/Dashboard/AddCourse";
import Instructor from "./Components/Core/Dashboard/InstructorDashboard.jsx/Instructor";
import EditCourse from "./Components/Core/Dashboard/EditCourse/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Components/Core/ViewCourse/VideoDetails";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Error from "./Pages/Error";

function App() {
  const { user } = useSelector((state) => state.Profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<OpenRoute><Login/></OpenRoute>} />
        <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>} />
        <Route path='/forgot-password' element={<OpenRoute><ForgotPassword/></OpenRoute>} />
        <Route path='/update-password/:id' element={<OpenRoute><UpdatePassword/></OpenRoute>} />
        <Route path='/verify-email' element={<OpenRoute><VerifyEmail/></OpenRoute>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>}/>

        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path='/dashboard/my-profile' element={<MyProfile/>} />
          <Route path='/dashboard/purchase-history' element={<PurchaseHistory/>} />
          <Route path="/dashboard/settings" element={<Settings/>} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>} />
                <Route path='/dashboard/cart' element={<Cart/>} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }
        </Route>

        <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
        {
          user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails/>} />
          )
        }
        </Route> 
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;