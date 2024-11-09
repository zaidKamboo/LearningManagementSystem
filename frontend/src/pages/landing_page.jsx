import Navbar from '../components/home/navbar';
import HeroSection1 from '../components/home/hero_section1';
import HeroSection2 from '../components/home/hero_section2';
import HeroSection3 from '../components/home/hero_section3';
import Services from '../components/home/services';
import Courses from '../components/home/courses';
import Testimonials from '../components/home/testimonials';
import Footer from '../components/home/footer';

const LandingPage = () => {
    return <>
        <Navbar />
        <HeroSection1 />
        <HeroSection2 />
        <HeroSection3 />
        <Services />
        <Courses />
        <Testimonials />
        <Footer />
    </>
}

export default LandingPage;