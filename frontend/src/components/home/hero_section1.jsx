import { Link } from 'react-router-dom';
import content_img from '../../assets/landing/content-img.png';
import content_img1 from '../../assets/landing/content-img-1.png';
import hero_1 from '../../assets/landing/hero-1.png';

const HeroSection1 = () => {
    return (
        <section className="bg-blue-100 py-12 md:py-16 lg:py-20 h-screen">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-12 h-full">

                <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center h-full">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4 md:mb-6 lg:mb-8">
                        All-in-one Study courses to easily learn and get certified
                    </h1>
                    <div className="mb-6">
                        <Link to='/login'>
                            <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full hover:bg-blue-700 transition duration-300">
                                Login Now
                            </button>
                        </Link>
                    </div>
                    <div className="flex justify-center md:justify-start space-x-2 md:space-x-4">
                        <img src={content_img} className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover" alt="Content Image 1" />
                        <img src={content_img1} className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover" alt="Content Image 2" />
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center items-center h-full">
                    <img src={hero_1} className="w-full h-auto object-cover" alt="Hero Image" />
                </div>
            </div>
        </section>
    );
}

export default HeroSection1;
