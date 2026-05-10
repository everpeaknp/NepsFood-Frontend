export default function AboutTextSection2() {
    return (
        <section
            className="w-full py-4 sm:py-6 lg:py-8 xl:py-10"
        >
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="max-w-[1340px] mx-auto">
                    <div className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2vw, 24px)' }}>
                        {/* Heading */}
                        <h3
                            className="text-left"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: 'clamp(20px, 2.5vw, 28px)',
                                lineHeight: '1.5em',
                                letterSpacing: '-0.5%',
                                color: '#212529',
                                margin: 0,
                            }}
                        >
                            Praesent dictum felis eget velit malesuada hendrerit.
                        </h3>

                        {/* First Paragraph */}
                        <p
                            className="text-left"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 300,
                                fontSize: 'clamp(14px, 1.3vw, 15.5px)',
                                lineHeight: '1.7em',
                                letterSpacing: '-0.5%',
                                color: '#212529',
                                margin: 0,
                            }}
                        >
                            Aliquam erat volutpat. Maecenas imperdiet metus quis diam posuere gravida. Nullam nec sodales risus, sed condimentum odio. Etiam facilisis suscipit arcu, sit amet rhoncus nulla volutpat eu. Donec turpis diam, feugiat vitae rutrum lacinia, sodales non turpis.
                        </p>

                        {/* Second Paragraph */}
                        <p
                            className="text-left"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 300,
                                fontSize: 'clamp(14px, 1.3vw, 15.5px)',
                                lineHeight: '1.7em',
                                letterSpacing: '-0.5%',
                                color: '#212529',
                                margin: 0,
                            }}
                        >
                            Curabitur et mi in magna luctus finibus. Aenean ac turpis quis tortor lacinia bibendum. Aliquam sed nisi arcu. Sed efficitur placerat nunc, vel eleifend augue rhoncus ac. Nulla ut sagittis tellus. Donec nec vulputate ligula. Etiam non sapien nec arcu ullamcorper pellentesque at non neque. Proin at hendrerit nibh. Fusce metus enim, euismod bibendum feugiat in, blandit convallis felis.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
