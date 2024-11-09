import { Link } from 'react-router-dom';
import hero_3 from '../../assets/landing/hero-3.png';

const HeroSection3 = () => {
    return (
        <section className="bg-gradient-to-b from-cyan-400 to-slate-900 py-12 md:py-16 lg:py-20 h-auto w-full" id="aboutus">
            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-8 lg:px-12 w-full">

                {/* Text Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left mb-8 md:mb-0">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 md:mb-6 lg:mb-8">
                        Find more E-Learning Experience
                    </h1>
                    <p className="text-white text-base md:text-lg lg:text-xl mb-6">
                        Tailor your learning experience to your pace and preferences. Mix and match courses, and track your progress with ease.
                    </p>
                    <div className="hero-3-btn">
                        <Link to='/login'>
                            <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full hover:bg-blue-700 transition duration-300">
                                Login Now
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img src={hero_3} className="w-full h-auto object-cover" alt="Hero Image" />
                </div>
            </div>
        </section>
    );
}

export default HeroSection3;
