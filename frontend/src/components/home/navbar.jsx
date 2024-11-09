import img1 from '../../assets/landing/logo.png';
import content_img from '../../assets/landing/content-img.png';
import content_img1 from '../../assets/landing/content-img-1.png';
import hero_1 from '../../assets/landing/hero-1.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <section className="landing-page bg-gray-50">
      <header>
        <nav className="navbar1 bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
            <div className="logo1">
              <img src={img1} alt="Logo" className="h-10 md:h-12 lg:h-14" />
            </div>
            <div className="menu1 hidden md:flex space-x-8">
              <ul className="flex items-center space-x-4 md:space-x-6 lg:space-x-8 text-gray-700 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition duration-300">Home</a></li>
                <li><a href="#aboutus" className="hover:text-blue-600 transition duration-300">About</a></li>
                <li><a href="#service" className="hover:text-blue-600 transition duration-300">Services</a></li>
                <li><a href="#course" className="hover:text-blue-600 transition duration-300">Courses</a></li>
                <li><a href="#testi" className="hover:text-blue-600 transition duration-300">Testimonial</a></li>
              </ul>
            </div>
            <div className="navBtn">
              <Link to='/login'>
                <button className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2 lg:px-6 lg:py-3 rounded-full hover:bg-blue-700 transition duration-300">Login Now</button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </section>
  );
}

export default Navbar;
