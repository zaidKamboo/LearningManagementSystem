import React, { useState, useEffect, useContext } from "react";
import Doubts from "../../components/chat/Doubts";
import { Link, useParams } from "react-router-dom";
import img from "../../assets/image.jpg";
import Accordian from "../../components/accordian/Accordian";
import AuthContext from "../../context/AuthContext";

function StudentCourseDetail() {
    const backend = import.meta.env.VITE_BACKEND;
    const { token } = useContext(AuthContext);
    const { course: id } = useParams();

    const [course, setCourse] = useState(null);

    function getCourseData() {
        fetch(backend + "/api/course/detail/" + id, { headers: { token } })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setCourse(data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getCourseData();
    }, []);

    if (!course) {
        return (
            <div className="teacher-view-course">
                <h1 className="title">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="teacher-view-course">
            <h1 className="title">{course.title}</h1>
            <h4 className="description">{course.description}</h4>

            <div className="course-content">
                <div className="left-content">
                    <img
                        src={backend + "/img/" + course.courseImg}
                        alt=""
                        className="course-img"
                    />
                    <h4>Lessons in this course.</h4>
                    {course.units.length > 0 ? (
                        <Accordian data={course.units} />
                    ) : (
                        <p>Currently no lessons...</p>
                    )}
                </div>

                <div className="right-content">
                    <div className="course-detail-box">
                        <div className="left-side">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                            >
                                <path
                                    d="M17.1818 0H3.27273C2.40475 0 1.57231 0.324175 0.958559 0.90121C0.344804 1.47824 0 2.26087 0 3.07692V19.2308C0 19.4348 0.0862012 19.6304 0.23964 19.7747C0.393079 19.919 0.601187 20 0.818182 20H15.5455C15.7625 20 15.9706 19.919 16.124 19.7747C16.2774 19.6304 16.3636 19.4348 16.3636 19.2308C16.3636 19.0268 16.2774 18.8311 16.124 18.6868C15.9706 18.5426 15.7625 18.4615 15.5455 18.4615H1.63636C1.63636 18.0535 1.80877 17.6622 2.11564 17.3737C2.42252 17.0852 2.83874 16.9231 3.27273 16.9231H17.1818C17.3988 16.9231 17.6069 16.842 17.7604 16.6978C17.9138 16.5535 18 16.3579 18 16.1538V0.769231C18 0.565218 17.9138 0.369561 17.7604 0.225302C17.6069 0.0810437 17.3988 0 17.1818 0ZM16.3636 15.3846H3.27273C2.6981 15.3839 2.13352 15.5262 1.63636 15.7971V3.07692C1.63636 2.6689 1.80877 2.27758 2.11564 1.98907C2.42252 1.70055 2.83874 1.53846 3.27273 1.53846H16.3636V15.3846Z"
                                    fill="black"
                                />
                            </svg>
                            <div>
                                <small>Lessons</small>
                                <p>{course.units.length}</p>
                            </div>
                        </div>
                        <div className="right-side">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M0 5H4V16H0V5ZM12 9H16V16H12V9ZM6 0H10V16H6V0Z"
                                    fill="black"
                                />
                            </svg>
                            <div>
                                <small>Difficulty</small>
                                <p>Beginner</p>
                            </div>
                        </div>
                    </div>
                    <div className="course-detail">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="27"
                                viewBox="0 0 28 27"
                                fill="none"
                            >
                                <path
                                    d="M27.2634 4.37332L14.3405 0.0554033C14.1194 -0.0184678 13.8804 -0.0184678 13.6593 0.0554033L0.73634 4.37332C0.521906 4.44497 0.335401 4.58244 0.203245 4.76626C0.0710893 4.95007 -1.67491e-05 5.1709 2.9593e-09 5.39748V16.1923C2.9593e-09 16.4786 0.11346 16.7531 0.315421 16.9556C0.517381 17.158 0.791299 17.2717 1.07691 17.2717C1.36253 17.2717 1.63645 17.158 1.83841 16.9556C2.04037 16.7531 2.15383 16.4786 2.15383 16.1923V6.89525L6.67552 8.40518C5.47416 10.3507 5.09214 12.6945 5.61333 14.9221C6.13451 17.1497 7.51631 19.0789 9.4553 20.2862C7.03225 21.2388 4.93765 22.962 3.40574 25.3179C3.32607 25.4366 3.27073 25.57 3.24294 25.7103C3.21515 25.8506 3.21546 25.9951 3.24385 26.1353C3.27225 26.2755 3.32816 26.4086 3.40834 26.527C3.48853 26.6453 3.59137 26.7465 3.71091 26.8247C3.83045 26.9028 3.9643 26.9564 4.10467 26.9822C4.24504 27.0081 4.38913 27.0057 4.52858 26.9752C4.66802 26.9448 4.80004 26.8868 4.91694 26.8048C5.03385 26.7227 5.13332 26.6182 5.20957 26.4972C7.23821 23.3776 10.442 21.5897 13.9999 21.5897C17.5577 21.5897 20.7616 23.3776 22.7902 26.4972C22.9481 26.7326 23.1921 26.8961 23.4694 26.9525C23.7467 27.009 24.035 26.9537 24.272 26.7988C24.509 26.6439 24.6756 26.4016 24.7359 26.1245C24.7962 25.8474 24.7452 25.5577 24.594 25.3179C23.0621 22.962 20.9594 21.2388 18.5445 20.2862C20.4816 19.079 21.8621 17.151 22.3832 14.9251C22.9043 12.6991 22.5235 10.3568 21.3242 8.41192L27.2634 6.42838C27.4779 6.35677 27.6645 6.21931 27.7967 6.0355C27.9289 5.85168 28 5.63083 28 5.40422C28 5.17762 27.9289 4.95676 27.7967 4.77295C27.6645 4.58913 27.4779 4.45168 27.2634 4.38007V4.37332ZM20.4614 12.9538C20.4617 13.9778 20.2197 14.9872 19.7555 15.8993C19.2912 16.8114 18.6178 17.6002 17.7905 18.2009C16.9632 18.8016 16.0057 19.1971 14.9964 19.3551C13.9871 19.513 12.9548 19.4288 11.9842 19.1093C11.0137 18.7899 10.1325 18.2444 9.41302 17.5175C8.69353 16.7906 8.15623 15.9031 7.8452 14.9277C7.53416 13.9524 7.45826 12.917 7.62372 11.9066C7.78918 10.8962 8.19128 9.93944 8.79704 9.11493L13.6593 10.7342C13.8804 10.808 14.1194 10.808 14.3405 10.7342L19.2027 9.11493C20.0209 10.2268 20.462 11.5722 20.4614 12.9538ZM13.9999 8.57789L4.48265 5.39748L13.9999 2.21706L23.5171 5.39748L13.9999 8.57789Z"
                                    fill="black"
                                />
                            </svg>
                            <small>Students:</small>
                            <p>{course.enrolledStudents}</p>
                        </div>

                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                            >
                                <path
                                    d="M13 0C10.4288 0 7.91543 0.762436 5.77759 2.19089C3.63975 3.61935 1.97351 5.64968 0.989572 8.02511C0.00563247 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5994 25.9944 17.9749 25.0104C20.3503 24.0265 22.3806 22.3602 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.996 9.55343 24.625 6.24918 22.1879 3.81208C19.7508 1.37499 16.4466 0.00404765 13 0ZM13 24.4706C10.7313 24.4706 8.51362 23.7978 6.62729 22.5374C4.74096 21.277 3.27075 19.4856 2.40256 17.3896C1.53438 15.2936 1.30723 12.9873 1.74982 10.7622C2.19242 8.53712 3.28488 6.49326 4.88907 4.88907C6.49326 3.28488 8.53713 2.19241 10.7622 1.74982C12.9873 1.30722 15.2936 1.53438 17.3896 2.40256C19.4856 3.27074 21.277 4.74095 22.5374 6.62728C23.7979 8.51361 24.4706 10.7313 24.4706 13C24.4672 16.0412 23.2576 18.9568 21.1072 21.1072C18.9568 23.2576 16.0412 24.4672 13 24.4706ZM20.902 13C20.902 13.2028 20.8214 13.3973 20.678 13.5407C20.5346 13.6841 20.3401 13.7647 20.1373 13.7647H13C12.7972 13.7647 12.6027 13.6841 12.4593 13.5407C12.3159 13.3973 12.2353 13.2028 12.2353 13V5.86274C12.2353 5.65993 12.3159 5.46543 12.4593 5.32202C12.6027 5.17861 12.7972 5.09804 13 5.09804C13.2028 5.09804 13.3973 5.17861 13.5407 5.32202C13.6841 5.46543 13.7647 5.65993 13.7647 5.86274V12.2353H20.1373C20.3401 12.2353 20.5346 12.3159 20.678 12.4593C20.8214 12.6027 20.902 12.7972 20.902 13Z"
                                    fill="black"
                                />
                            </svg>
                            <small>Duration:</small>
                            <p>{course.duration} Hours</p>
                        </div>

                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="26"
                                viewBox="0 0 18 26"
                                fill="none"
                            >
                                <path
                                    d="M3.93868 12.084H9.00004H14.0613C14.603 12.084 15.0421 11.6449 15.0421 11.1032V6.04183C15.0421 6.04011 15.0419 6.03848 15.0419 6.03681C15.0391 2.72446 12.3547 0 9.00009 0C5.6743 0 2.961 2.70388 2.95826 6.03686C2.95826 6.03859 2.95801 6.04021 2.95801 6.04188V11.1032C2.95796 11.6449 3.39706 12.084 3.93868 12.084ZM12.592 4.10764C10.6857 4.87531 8.46095 4.07678 7.48513 2.25429C9.39986 1.48612 11.5998 2.27274 12.592 4.10764ZM5.88498 3.41052C7.33086 5.8533 10.3659 6.98085 13.08 6.01983C13.08 6.02723 13.0805 6.03448 13.0805 6.04188C13.0805 8.29181 11.25 10.1223 9.00009 10.1223C5.53417 10.1224 3.65087 6.05126 5.88498 3.41052Z"
                                    fill="black"
                                />
                                <path
                                    d="M8.99997 12.8574C4.01464 12.8574 0 16.9173 0 21.8574V24.9679C0 25.5096 0.4391 25.9487 0.980727 25.9487H17.0192C17.5609 25.9487 18 25.5096 18 24.9679V21.8574C17.9999 16.9055 13.9769 12.8574 8.99997 12.8574ZM12.1265 15.5527L8.99997 18.6792L5.87347 15.5527C7.80152 14.5927 10.1246 14.5559 12.1265 15.5527ZM1.96145 23.9871V21.8573C1.96145 19.8142 2.83682 17.9719 4.23176 16.6849L8.30646 20.7596C8.6894 21.1426 9.3104 21.1426 9.69344 20.7596L13.7681 16.6849C15.1631 17.9719 16.0384 19.8142 16.0384 21.8573V23.9871H1.96145Z"
                                    fill="black"
                                />
                            </svg>
                            <small>Teacher:</small>
                            <p>{course.teacher}</p>
                        </div>
                    </div>
                    {!course.isEnrolled && (
                        <button className="btn btn-filled">Enroll</button>
                    )}
                </div>

                {!course.isEnrolled && (
                    <div className="floatingBtn">
                        <div className="blur"></div>
                        <button className="btn btn-filled">Enroll</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentCourseDetail;
