import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
    EffectCoverflow,
    Pagination,
    Navigation,
    Autoplay,
} from "swiper/modules";

function Overview() {
    const slides = [
        {
            img: "https://img.freepik.com/free-vector/artificial-intelligence-isometric-illustration_1284-24769.jpg?w=740&t=st=1699778074~exp=1699778674~hmac=142078955c2d670fd17f2ea6fa0594856ea718a35279136b6f5e4618a6864383",
            content: "Content for Image 1",
        },
        {
            img: "https://img.freepik.com/premium-vector/vector-artificial-intelligence-effect-digital-technology-concepe-fututuristic-hi-tech-background_178863-746.jpg?w=1380",
            content: "Content for Image 2",
        },
        {
            img: "https://img.freepik.com/free-photo/skull-with-many-different-parts-it_698780-1005.jpg?t=st=1699778840~exp=1699782440~hmac=1b6f556fdefed708b73a78dd5e5c6d0ac217ef9068a1358ba838be030bc815af&w=826",
            content: "Content for Image 3",
        },
        {
            img: "https://img.freepik.com/free-vector/data-analysis-artificial-intelligence-isometric_107791-200.jpg?w=1380&t=st=1699778856~exp=1699779456~hmac=fc46b2940df7ebdf349e4d66e88fcb7d5280c425e36fec53b14eb2363da7eaa3",
            content: "Content for Image 4",
        },
        {
            img: "https://img.freepik.com/free-vector/big-data-processing-industry-4-0-automatisation-process-artificial-intelligence-ai_39422-927.jpg?w=1380&t=st=1699778873~exp=1699779473~hmac=6ab478eb03339d90f88234fc2e806c7d16ed124918c039a1dafd72dea0bd5449",
            content: "Content for Image 5",
        },
        {
            img: "https://img.freepik.com/premium-vector/vector-artificial-intelligence-effect-digital-technology-concepe-fututuristic-hi-tech-background_178863-746.jpg?w=1380",
            content: "Content for Image 2",
        },
        {
            img: "https://img.freepik.com/free-photo/skull-with-many-different-parts-it_698780-1005.jpg?t=st=1699778840~exp=1699782440~hmac=1b6f556fdefed708b73a78dd5e5c6d0ac217ef9068a1358ba838be030bc815af&w=826",
            content: "Content for Image 3",
        },
    ];

    return (
        <div className="container ">
            <h1 className="font-bold uppercase text-5xl text-center text-white mb-24">
                Overview
            </h1>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: ".swiper-pagination", clickable: true }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="swiper_container"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <img src={slide.img} alt={`slide_image_${index}`} />
                        <div className="text-white font-bold text-xl text-center">
                            {slide.content}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* <div className="flex justify-center">
                <button className="group group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-sky-300  duration-500 before:duration-500 hover:duration-500 underline underline-offset-2    hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-sky-300 hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-sky-900 relative bg-sky-800 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-sky-400 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-cyan-600 after:right-8 after:top-3 after:rounded-full after:blur">
                    See more
                </button>
            </div> */}
        </div>
    );
}

export default Overview;
