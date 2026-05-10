export default function OurStoryWithStats() {
    const stats = [
        { number: "25K+", label: "Happy Customers" },
        { number: "34K+", label: "Happy Customers" },
        { number: "45K+", label: "Happy Customers" },
        { number: "57K+", label: "Happy Customers" }
    ];

    return (
        <section
            className="w-full py-4 sm:py-6 lg:py-8 xl:py-10"
        >
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="max-w-[1340px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-start" style={{ gap: 'clamp(30px, 8vw, 107.59px)' }}>
                        {/* Left Column - "OUR STORY" Label */}
                        <div className="w-full lg:w-auto lg:flex-shrink-0">
                            <span
                                className="block text-left"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 300,
                                    fontSize: '12px',
                                    lineHeight: '1.5em',
                                    letterSpacing: '-2%',
                                    textTransform: 'uppercase',
                                    color: '#757575',
                                }}
                            >
                                Our Story
                            </span>
                        </div>

                        {/* Right Column - Main Content */}
                        <div className="w-full flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 40px)' }}>
                            {/* Heading */}
                            <h2
                                className="text-left"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 600,
                                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                                    lineHeight: '1.4em',
                                    letterSpacing: '-1%',
                                    color: '#212529',
                                    margin: 0,
                                }}
                            >
                                Maecenas eleifend commodo sem, in euismod ex suscipit id. Praesent venenatis efficitur quam in posuere.
                            </h2>

                            {/* Paragraph */}
                            <p
                                className="text-left"
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 300,
                                    fontSize: 'clamp(15px, 1.5vw, 17.3px)',
                                    lineHeight: '1.6647em',
                                    letterSpacing: '-2.31%',
                                    color: '#212529',
                                    margin: 0,
                                }}
                            >
                                Aliquam erat volutpat. Maecenas imperdiet metus quis diam posuere gravida. Nullam nec sodales risus, sed condimentum odio. Etiam facilisis suscipit arcu, sit amet rhoncus nulla volutpat eu. Donec turpis diam, feugiat vitae rutrum lacinia, sodales non turpis.
                            </p>

                            {/* Statistics Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-left">
                                        <div
                                            style={{
                                                fontFamily: 'Inter, sans-serif',
                                                fontWeight: 300,
                                                fontSize: 'clamp(48px, 6vw, 80px)',
                                                lineHeight: '1.2em',
                                                color: '#E8E8E8',
                                                marginBottom: 'clamp(8px, 1vw, 12px)',
                                            }}
                                        >
                                            {stat.number}
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: 'Inter, sans-serif',
                                                fontWeight: 400,
                                                fontSize: 'clamp(13px, 1.2vw, 15px)',
                                                lineHeight: '1.5em',
                                                color: '#212529',
                                            }}
                                        >
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
