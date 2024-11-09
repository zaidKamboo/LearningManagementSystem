import './App.css'
import 'reactjs-popup/dist/index.css';
// css files
import './pages/teacher/TeacherCourseDetail.css'
import './pages/teacher/TeacherUnitDetail.css'
import './pages/teacher/TeacherDashboard.css'
import './pages/teacher/TeacherStudentList.css'
import './pages/teacher/AddCourse.css'
//css end
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Layout from './components/layout/Layout'
import StudentCourseDetail from './pages/student/StudentCourseDetail'
import StudentTest from './pages/student/StudentTest'
import StudentUnitDetail from './pages/student/StudentUnitDetail'
import StudentVideo from './pages/student/StudentVideo'
import Certificates from './pages/student/Certificates'
import Login from './pages/login'
import PrivateRoute from './components/private/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import TeacherPrivateRoute from './components/private/TeacherPrivateRoute'
import AuthProvider from './context/AuthProvider'
import MyCourse from './components/myCourse/MyCourse'
import TeacherStudentList from './pages/teacher/TeacherStudentList'
import TeacherCourseList from './pages/teacher/TeacherCourseList'
import StudentSearchCourse from './pages/student/StudentSearchCourse'
import AdminPrivateRoute from './components/private/AdminPrivateRoute'
import AdminTeacherList from './pages/admin/AdminTeacherList'
import AdminStudentList from './pages/admin/AdminStudentList'
import AdminCourseList from './pages/admin/AdminCourseList'
import TeacherStudentProfile from './pages/teacher/TeacherStudentProfile'
import DoubtMessages from './components/chat/DoubtMessages'
import AllDoubts from './components/chat/AllDoubts'
import LandingPage from './pages/landing_page'
import AddCourse from './pages/teacher/AddCourse'
import AdminAddStudent from './pages/admin/AdminAddStudent'
import AdminAddTeacher from './pages/admin/AdminAddTeacher'
import EditCourse from './pages/teacher/EditCourse';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import AddUnit from './pages/teacher/AddUnit';
import AddTest from './pages/teacher/AddTest';
import AllRoutes from './pages';

function StopRouter() {
  const { login } = useContext(AuthContext);
  return (
    <>
      {
        login !== null && <Outlet />
      }
    </>
  )
}

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<StopRouter />}>

              <Route path='/login' element={<Login />} />
              <Route path='/home' element={<LandingPage />} />
              <Route path='/' element={<Layout />}>

                <Route element={<PrivateRoute />}>

                  <Route index element={<Dashboard />} />
                  <Route path='mycourse/' element={<MyCourse />} />
                  <Route path='profile/' element={<TeacherStudentProfile />} />

                  <Route path='courses/' element={<StudentSearchCourse />} />

                  <Route path='certificate/' element={<Certificates />} />

                  <Route path='courseDetail/:course/' element={<StudentCourseDetail />}>
                    <Route path='' element={<AllDoubts />} />
                    <Route path='doubt/:id/' element={<DoubtMessages />} />
                  </Route>

                  <Route path='courseDetail/:course/unitDetail/:id/' element={<StudentUnitDetail />} />

                  <Route
                    path='courseDetail/:course/video/:videoId/'
                    element={<StudentVideo />}
                  />

                  <Route
                    path='courseDetail/:course/test/:testId/'
                    element={<StudentTest />}
                  />

                  <Route
                    path='courseDetail/:course/finaltest/:testId/'
                    element={<StudentTest />}
                  />

                  <Route element={<TeacherPrivateRoute />}>
                    <Route path='addCourse/' element={<AddCourse />} />
                    <Route path='editCourse/:id/' element={<EditCourse />} />
                    <Route path='editCourse/:id/finalTest' element={<AddTest />} />
                    <Route path='editCourse/:id/addUnit/' element={<AddUnit />} />
                    <Route path='editCourse/:id/editUnit/:unitId' element={<AddUnit />} />
                    <Route path='editCourse/:id/editUnit/:unitId/test' element={<AddTest />} />
                    <Route path='courselist/' element={<TeacherCourseList />} />
                    <Route path='teacherstudentlist/' element={<TeacherStudentList />} />
                    <Route path='teacherStudentList/add/' element={<AdminAddStudent />} />
                    <Route path='teacherStudentList/update/:id/' element={<AdminAddStudent />} />
                  </Route>
                  <Route element={<AdminPrivateRoute />}>
                    <Route path='teacherlist/' element={<AdminTeacherList />} />
                    <Route path='adminStudentList/' element={<AdminStudentList />} />
                    <Route path='adminCourselist/' element={<AdminCourseList />} />
                    <Route path='adminStudentList/add/' element={<AdminAddStudent />} />
                    <Route path='adminStudentList/update/:id/' element={<AdminAddStudent />} />
                    <Route path='teacherlist/add/' element={<AdminAddTeacher />} />
                    <Route path='teacherlist/update/:id/' element={<AdminAddTeacher />} />
                  </Route>

                </Route>

              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter> */}
      <AllRoutes />
    </>
  )
}

export default App


{/* <Route path='/login' element={<Login />} />
<Route path='/' element={<Layout />}>
  <Route index element={<Navigation />}></Route>
  <Route path='teacherCourseDetail' element={<TeacherCourseDetail />} />
  <Route path='studentDashboard' element={<StudentDashboard />} />
  <Route path='studentCourseDetail' element={<StudentCourseDetail />} />
  <Route path='teacherUnitDetail' element={<TeacherUnitDetail />} />
  <Route path='studentUnitDetail' element={<StudentUnitDetail />} />
  <Route path='teacherViewTest' element={<TeacherViewTest />} />
  <Route path='studentTest' element={<StudentTest />} />
  <Route path='adminDashboard' element={<AdminDashboard />} />
  <Route path='studentVideo' element={<StudentVideo />} />
  <Route path='teacherCourses' element={<TeacherMyCourses />} />
  <Route path='teacherDashboard' element={<TeacherDashboard />} />
  <Route path='teacherCourseList' element={<TeacherCourseList />} />
  <Route path='teacherStudentList' element={<TeacherStudentList />} />
  <Route path='adminTeacherList' element={<AdminTeacherList />} />
  <Route path='adminStudentList' element={<AdminStudentList />} />
  <Route path='adminStudentProfile' element={<AdminStudentProfile />} />
  <Route path='certificates' element={<Certificates />} />
  <Route path='studentMyCourse' element={<StudentMyCourse />} />
</Route> */}
