import vec from '../../assets/landing/vec.png';
import vec_2 from '../../assets/landing/vec-2.png';
import test from '../../assets/landing/test.png';
import rating from '../../assets/landing/rating.png';

const Testimonials = () => {
    return (
        <section className="relative bg-gray-100 py-12 md:py-16 lg:py-20" id="testi">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                        Testimonials
                    </h1>
                </div>

                {/* Carousel */}
                <div className="flex overflow-x-auto no-scrollbar space-x-4">
                    {/* Testimonial Item 1 */}
                    <div className="flex-none w-full md:w-3/4 lg:w-1/2 px-4">
                        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                            <img src={test} alt="Testimonial" className="w-1/4 h-auto object-cover rounded-full" />
                            <div className="ml-4 w-3/4">
                                <p className="text-gray-600 mb-4">
                                    “I just wanted to share a quick note and let you know that you
                                    guys do a really good job. I’m glad work with you.”
                                </p>
                                <div className="flex items-center">
                                    <h2 className="text-lg font-semibold text-gray-800 mr-2">MR. KAMIL KHAN</h2>
                                    <img src={rating} alt="Rating" className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Testimonial Item 2 */}
                    <div className="flex-none w-full md:w-3/4 lg:w-1/2 px-4">
                        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                            <img src={test} alt="Testimonial" className="w-1/4 h-auto object-cover rounded-full" />
                            <div className="ml-4 w-3/4">
                                <p className="text-gray-600 mb-4">
                                    “I just wanted to share a quick note and let you know that you
                                    guys do a really good job. I’m glad work with you.”
                                </p>
                                <div className="flex items-center">
                                    <h2 className="text-lg font-semibold text-gray-800 mr-2">MR. KAMIL KHAN</h2>
                                    <img src={rating} alt="Rating" className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Testimonial Item 3 */}
                    <div className="flex-none w-full md:w-3/4 lg:w-1/2 px-4">
                        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
                            <img src={test} alt="Testimonial" className="w-1/4 h-auto object-cover rounded-full" />
                            <div className="ml-4 w-3/4">
                                <p className="text-gray-600 mb-4">
                                    “I just wanted to share a quick note and let you know that you
                                    guys do a really good job. I’m glad work with you.”
                                </p>
                                <div className="flex items-center">
                                    <h2 className="text-lg font-semibold text-gray-800 mr-2">MR. KAMIL KHAN</h2>
                                    <img src={rating} alt="Rating" className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background Images */}
                <div className="absolute inset-0 pointer-events-none">
                    <img src={vec} alt="Vector Background" className="absolute top-0 left-0 w-full h-full opacity-30 object-cover" />
                    <img src={vec_2} alt="Vector Background" className="absolute bottom-0 right-0 w-full h-full opacity-30 object-cover" />
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
