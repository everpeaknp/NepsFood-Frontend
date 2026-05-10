export default function AboutTextSection3() {
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
                            Ut auctor nisi a risus ornare, sed efficitur ipsum sagittis.
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
                            Nunc imperdiet rutrum eleifend. Sed accumsan aliquet dolor eget aliquam. Morbi ac nulla at tellus luctus luctus. Suspendisse feugiat eleifend viverra. Quisque aliquam eros ac sem aliquam, sed interdum dolor sagittis. Aliquam vel commodo lacus, eget rutrum ipsum. Sed feugiat nisi est, et ultricies purus laoreet vitae.
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
                            Aenean semper suscipit placerat. Praesent sagittis leo nunc, eu pharetra sapien finibus sed. Vivamus odio mauris, euismod vulputate tortor a, sodales auctor nisi. Morbi turpis erat, aliquet sit amet consequat et, gravida sit amet nibh. Mauris tempus auctor elit id tempor. In maximus pulvinar sem vel interdum. Curabitur accumsan dolor eget augue varius lobortis.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
