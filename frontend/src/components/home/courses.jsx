import cor_1 from '../../assets/landing/cor-1.png';
import cor_2 from '../../assets/landing/cor-2.png';
import cor_3 from '../../assets/landing/cor-3.png';
import cor_4 from '../../assets/landing/cor-4.png';


const Courses = () => {
    return (
        <section className="bg-gray-100 py-12 md:py-16 lg:py-20" id="course">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        OUR COURSES
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg lg:text-xl">
                        Access your courses on-the-go. Learn whenever, wherever, and however you want.
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <img src={cor_1} alt="Data Science" className="w-full h-40 object-cover mb-4" />
                            <div className="flex items-center text-gray-600 mb-2">
                                <i className="fa-solid fa-clock mr-2"></i>
                                <p>1hr 30 min</p>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Data Science</h3>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <img src={cor_2} alt="UI Automation" className="w-full h-40 object-cover mb-4" />
                            <div className="flex items-center text-gray-600 mb-2">
                                <i className="fa-solid fa-clock mr-2"></i>
                                <p>1hr 30 min</p>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">UI Automation</h3>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <img src={cor_3} alt="Data Analytics" className="w-full h-40 object-cover mb-4" />
                            <div className="flex items-center text-gray-600 mb-2">
                                <i className="fa-solid fa-clock mr-2"></i>
                                <p>1hr 30 min</p>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Data Analytics</h3>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <img src={cor_4} alt="Cyber Security" className="w-full h-40 object-cover mb-4" />
                            <div className="flex items-center text-gray-600 mb-2">
                                <i className="fa-solid fa-clock mr-2"></i>
                                <p>1hr 30 min</p>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Cyber Security</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Courses;
