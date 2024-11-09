import serv_1 from '../../assets/landing/serv-1.png';
import serv_2 from '../../assets/landing/serv-2.png';
import serv_3 from '../../assets/landing/serv-3.png';

const Services = () => {
    return (
        <section className="bg-gray-100 py-12 md:py-16 lg:py-20" id="service">
            <div className="container mx-auto px-4 md:px-8 lg:px-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                        OUR SERVICES
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg lg:text-xl">
                        Connect with peers, join study groups, and collaborate on projects.<br />
                        Learning is better when you do it together.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <img src={serv_2} alt="Notification & Email" className="w-full h-40 object-cover mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Notification & Email</h3>
                            <p className="text-gray-600">24/7 Notification and reminder for you</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <img src={serv_3} alt="Certification" className="w-full h-40 object-cover mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Certification</h3>
                            <p className="text-gray-600">Learn and get certificates and benefits</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4">
                            <img src={serv_1} alt="Azam Campus" className="w-full h-40 object-cover mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Azam Campus</h3>
                            <p className="text-gray-600">Learn from Pune's best campus</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
