import React from 'react';
import { motion } from 'framer-motion';

// Import local images
import img0_1 from '../assets/images/0_1.png';
import img0_2 from '../assets/images/0_2.png';
import img0_3_v2 from '../assets/images/0_3_v2.png';
import img0_3 from '../assets/images/0_3.png';
import imgAoi2 from '../assets/images/Aoi2.png';
import imgAva from '../assets/images/Ava.png';
import imgMJOL from '../assets/images/MJ-OL.png';
import imgNara from '../assets/images/Nara.png';
import imgRachel from '../assets/images/Rachel.png';
import imgYuna from '../assets/images/Yuna.png';
import imgPoliceFixed from '../assets/images/police-fixed-done.JPG';
import imgPolice2 from '../assets/images/police2.png';

const mockImages = [
    { id: 1, src: img0_1, title: 'Forest Whisper' },
    { id: 2, src: img0_2, title: 'Urban Solitude' },
    { id: 3, src: img0_3_v2, title: 'Ocean Dreams' },
    { id: 4, src: img0_3, title: 'Mountain High' },
    { id: 5, src: imgAoi2, title: 'Digital Soul' },
    { id: 6, src: imgAva, title: 'Neon Lights' },
    { id: 7, src: imgMJOL, title: 'Abstract Mind' },
    { id: 8, src: imgNara, title: 'Future City' },
    { id: 9, src: imgRachel, title: 'Retro Vibe' },
    { id: 10, src: imgYuna, title: 'Cyber Punk' },
    { id: 11, src: imgPoliceFixed, title: 'Lost in Time' },
    { id: 12, src: imgPolice2, title: 'Nature Calls' },
];

const GalleryGrid = () => {
    return (
        <div className="container mx-auto py-32 px-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight"
            >
                Featured Works
            </motion.h2>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {mockImages.map((image, index) => (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
                    >
                        <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                            <div className="glass rounded-xl p-4">
                                <h3 className="text-lg font-semibold text-white">
                                    {image.title}
                                </h3>
                                <p className="text-sm text-gray-300 mt-1">
                                    AI Photography
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GalleryGrid;
