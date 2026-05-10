import Image from "next/image";

export default function AboutImagesSection() {
    return (
        <section
            className="w-full py-4 sm:py-6 lg:py-8 xl:py-10"
        >
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
                <div className="max-w-[1340px] mx-auto">
                    {/* Two-column layout with 10px gap */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                        {/* First Image */}
                        <div className="w-full">
                            <div className="relative w-full" style={{ paddingBottom: '103.64%' }}>
                                <Image
                                    src="/about-image-01-69418b.png"
                                    alt="About Image 1"
                                    fill
                                    className="object-cover"
                                    style={{ borderRadius: '12px' }}
                                />
                            </div>
                        </div>

                        {/* Second Image */}
                        <div className="w-full">
                            <div className="relative w-full" style={{ paddingBottom: '103.64%' }}>
                                <Image
                                    src="/about-image-02-69418b.png"
                                    alt="About Image 2"
                                    fill
                                    className="object-cover"
                                    style={{ borderRadius: '12px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
