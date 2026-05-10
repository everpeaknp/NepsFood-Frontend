export default function OurStorySection() {
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
                        <div className="w-full flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2vw, 20px)' }}>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
