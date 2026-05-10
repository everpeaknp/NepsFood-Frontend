export default function FeaturesInfo() {
    const features = [
        {
            title: "Fast Shipping",
            description: "Receive your order anywhere in the world"
        },
        {
            title: "Return Policy",
            description: "Talk to our experts by chat or e-mail"
        },
        {
            title: "Payment Security",
            description: "Don't worry, all orders are processed securely"
        },
        {
            title: "Free Shipping",
            description: "Collect points and enjoy a host of benefits!"
        }
    ];

    return (
        <section className="w-full bg-white font-sans py-4 sm:py-6 lg:py-8 xl:py-10">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 pb-8 border-b border-gray-200">
                    {features.map((feature, index) => (
                        <div key={index} className="text-left">
                            <h2 className="text-gray-900 font-medium text-base mb-1">{feature.title}</h2>
                            <p className="text-gray-500 text-sm font-light">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
