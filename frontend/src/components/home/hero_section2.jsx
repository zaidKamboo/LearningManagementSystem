import hero_2 from '../../assets/landing/hero-2.png';
import { Link } from 'react-router-dom';

const HeroSection2 = () => {
    return (
        <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-8 lg:px-12">

                {/* Image Section */}
                <div className="w-full md:w-1/2 mt-8 md:mt-0">
                    <img src={hero_2} alt="Hero Image" className="w-full h-auto object-cover" />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 lg:mb-8">
                        Build The Skills To Drive Your Career.
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg lg:text-xl mb-6">
                        Learn from the best. Our instructors are industry leaders, experts, and educators dedicated to your success.
                    </p>
                    <Link to='/login'>
                        <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full hover:bg-blue-700 transition duration-300">
                            Login Now
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HeroSection2;
