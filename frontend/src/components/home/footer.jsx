import img1 from '../../assets/landing/logo.png'; // Update the import path as needed

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Us Section */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <img src={img1} alt="Logo" className="w-32 h-auto mb-4" />
                            <h2 className="text-xl font-bold mb-2">About Us</h2>
                            <p className="text-gray-400">
                                Welcome to LMS, where learning meets innovation.
                                Our state-of-the-art Learning Management System is designed to
                                empower individuals and organizations with a dynamic platform for
                                education and skill development.
                            </p>
                        </div>
                        <div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                Login Now
                            </button>
                        </div>
                    </div>

                    {/* Popular Courses Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Popular Courses</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Advanced Programming</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Web Development</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Backend Java Programming</a></li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                        <p className="text-gray-400 mb-4">A BCA (Science) Project Abeda Inamdar Senior College.</p>
                        <div className="flex items-center mb-4">
                            <i className="fa-solid fa-envelope text-gray-400 mr-2"></i>
                            <a href="mailto:Kamilkhan@gmail.com" className="text-gray-400 hover:text-white transition duration-300">Kamilkhan@gmail.com</a>
                        </div>
                        <div className="flex items-center">
                            <i className="fa-solid fa-phone-volume text-gray-400 mr-2"></i>
                            <p className="text-gray-400">72192919..</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
