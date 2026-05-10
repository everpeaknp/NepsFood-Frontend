export default function AboutTextSection() {
    return (
        <section
            className="w-full py-4 sm:py-6 lg:py-8 xl:py-10"
        >
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="max-w-[1340px] mx-auto">
                    <div className="w-full">
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
                            Vivamus sed metus sit amet dui scelerisque mattis. Donec id imperdiet nulla. Maecenas malesuada justo ac blandit maximus. Curabitur aliquam justo vitae felis pellentesque, a semper orci sollicitudin. Donec hendrerit nisl at neque dapibus dapibus. Morbi dignissim, ligula ut luctus dapibus, enim eros bibendum risus, in blandit quam augue a neque. Donec rhoncus ligula ut dapibus suscipit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
